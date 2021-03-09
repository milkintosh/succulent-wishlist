var express = require('express');
var router = express.Router();
var rawdata = require('./JSONdata/plant.json')
const { Sequelize } = require('sequelize');
var pg = require('pg');

const config = {
        database: 'wishlist',
        user :'postgres',
        password : '',
        hostname : "localhost",
        port : 5433
}

const db = {
  database: 'postgres',
  user :'postgres',
  password : '',
  hostname : "localhost",
  port : 5433
}

const dbpool = new pg.Pool(config);
const pgpool = new pg.Pool(db);

router.get('/', function(req, res, next) {
    // connect to postgres db
    pgpool.connect((err, client) => { 
        if (err) {
          console.log("Can not connect to the DB " + err);
          return;
        }
        dbpool.connect((err, clientOrg) => {
          if (err) {
            console.log("Can not connect to the DB " + err);
            return;
          }
          /* Get data and store into sql */
          rawdata.forEach((item,i) => {
            clientOrg.query("INSERT INTO plants(name, light, water, dormancy, hardiness) VALUES($1, $2, $3, $4, $5)", [item['name'], item['light'], item['water'], item['dormancy'], item['hardiness']], (err) => {
              if(err) {
                console.log("can't insert into table " + err);
                return;
              }  
            })
          })
          clientOrg.release();
        }) 
        client.release();
    })
res.send("json processed!")
});

module.exports = router;

const { Sequelize } = require('sequelize');
var express = require("express");
var router = express.Router();
var pg = require('pg');

const config = {
        database: 'wishlist',
        user :'postgres',
        password : 'K&s121063',
        hostname : "localhost",
        port : 5433
}

const db = {
  database: 'postgres',
  user :'postgres',
  password : 'K&s121063',
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
        // create the db and ignore any errors, for example if it already exists.
         client.query('CREATE DATABASE wishlist ', (err) => {
            dbpool.connect((err, clientOrg) => {
              if (err) {
                console.log("Can not connect to the DB " + err);
                return;
              }
              clientOrg.query("CREATE TABLE if not exists users (email VARCHAR(50) PRIMARY KEY); CREATE TABLE if not exists plants (name VARCHAR(50) PRIMARY KEY, light INTEGER, water INTEGER); CREATE TABLE if not exists plantsByUsers (email VARCHAR(50), name VARCHAR(50), list VARCHAR(20), FOREIGN KEY(email) REFERENCES users(email), FOREIGN KEY(name) REFERENCES plants(name));"
                      , (err) => {
                if(err) {
                  console.log("can't create table " + err);
                  return;
                }  
                if(req.query["signup"]) {
                  clientOrg.query("INSERT INTO users(email) VALUES ('" + req.query["email"] + "')",
                          (err) => {
                    if(err) {
                      console.log("can't insert item into table " + err);
                      return;
                    } 
                  })
                }
                else {
                  if(req.query["owned"]) { 
                    // clientOrg.query("INSERT INTO plants(name, light, water) VALUES ('" + req.query["owned"] + "', 1, 4)", () => {
                    // })
                      clientOrg.query("INSERT INTO plantsByUsers(email, name, list) VALUES('" + req.query["email"] + "', '" + req.query["owned"] + "', 'owned')",
                      (err) => {
                        if(err) {
                          console.log("can't insert owned item into table " + err);
                          return;
                        } 
                      })
                  }
                  else if(req.query["wishlist"]) {
                    clientOrg.query("INSERT INTO plants(name, light, water) VALUES ('" + req.query["wishlist"] + "', 1, 4)", () => {
                      clientOrg.query("INSERT INTO plantsByUsers(email, name, list) VALUES('" + req.query["email"] + "', '" + req.query["wishlist"] + "', 'wishlist')",
                      (err) => {
                        if(err) {
                          console.log("can't insert wishlist item into table " + err);
                          return;
                        } 
                      })
                    })
                  }
                  else if(req.query["lost"]) {
                    clientOrg.query("INSERT INTO plants(name, light, water) VALUES ('" + req.query["lost"] + "', 1, 4)", () => {
                      clientOrg.query("INSERT INTO plantsByUsers(email, name, list) VALUES('" + req.query["email"] + "', '" + req.query["lost"] + "', 'lost')",
                      (err) => {
                        if(err) {
                          console.log("can't insert lost item into table " + err);
                          return;
                        } 
                      })
                    })
                  }
                  else {
                    clientOrg.query("select * from plantsByUsers where email = '" + req.query["email"] + "'", (err, datares) => {
                      if(err) {
                        console.log("can't select plantsByUsers table " + err);
                        return;
                      }
                      res.send(datares.rows);//this might need to be changed... we are sending multiple rows now instead of one row with arrays, so in the retreival we need to change how we parse info
                    });
                  }
                }
                //res.send("hello");
                clientOrg.end();
              });
            })
          client.end(); // close the connection
        })
    });
});

module.exports=router;


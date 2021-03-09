var express = require("express");
var router = express.Router();
//const fetch = require('node-fetch');
const { Sequelize } = require('sequelize');
var pg = require('pg');
const e = require("express");

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

          //eventually we will have the ability to sort by certain criteria, so keep that in mind when putting the sql queries.

          /* If there was a page given, multiply page number to get offset data */
          if(req.query["page"]) {
            var json;
            clientOrg.query("SELECT * FROM plants WHERE name LIKE '%' || $1 || '%' LIMIT 20 OFFSET $2", [req.query["category"], 20*(req.query["page"]-1)], (err, datares) => {
                if(err) {
                console.log("can't insert into table " + err);
                return;
                }  
                json = datares.rows;
            })
            clientOrg.query("SELECT COUNT(*) FROM plants WHERE name LIKE '%' || $1 || '%'",[req.query["category"]], (err, datares) => {
                if(err) {
                console.log("can't insert into table " + err);
                return;
                } 
                var json2 = datares.rows;
                mergedjson = {
                    ...json,
                    ...json2
                }
                res.send(mergedjson);
            })
          }
          else {
              var json;
            clientOrg.query("SELECT * FROM plants WHERE name LIKE '%' || $1 || '%' LIMIT 20;",[req.query["category"]], (err, datares) => {
                if(err) {
                console.log("can't insert into table " + err);
                return;
                } 
                json = datares.rows;
            })
            clientOrg.query("SELECT COUNT(*) FROM plants WHERE name LIKE '%' || $1 || '%'",[req.query["category"]], (err, datares) => {
                if(err) {
                console.log("can't insert into table " + err);
                return;
                } 
                var json2 = datares.rows;
                mergedjson = {
                    ...json,
                    ...json2
                }
                res.send(mergedjson);
            })
          }
          clientOrg.release();
        })
        client.release();
    })
})
/*router.get("/", function(req, res, next) {
    var response = null;
    (async () => {
        while(response === null) {
            if(req.query["page"])
            response = await fetch('https://trefle.io/api/v1/plants/search?token=t6fv-ES4_jzBO5egjrzYMn0OTvitq3VbE3RKh42nu48&q='+ req.query["category"] + '&page=' + req.query["page"]);
            else 
            response = await fetch('https://trefle.io/api/v1/plants/search?token=t6fv-ES4_jzBO5egjrzYMn0OTvitq3VbE3RKh42nu48&q='+ req.query["category"]);
        }
        const json = await response.json();
        res.send(json);
        })()
        .catch(function(error) {
            // An error happened.
            res.send(response);
        });
});*/

module.exports=router;
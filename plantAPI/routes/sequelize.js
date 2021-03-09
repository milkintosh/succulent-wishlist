const { Sequelize } = require('sequelize');
var express = require("express");
var router = express.Router();
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
        // create the db and ignore any errors, for example if it already exists.
         client.query('CREATE DATABASE wishlist ', (err) => {
            dbpool.connect((err, clientOrg) => {
              if (err) {
                console.log("Can not connect to the DB " + err);
                return;
              }
              clientOrg.query("CREATE TABLE if not exists users (email VARCHAR(50) PRIMARY KEY); CREATE TABLE if not exists plants (name VARCHAR(100) UNIQUE, light INTEGER, water INTEGER, dormancy VARCHAR(20), hardiness VARCHAR(20), PRIMARY KEY(name)); CREATE TABLE if not exists plantsByUsers (email VARCHAR(50), name VARCHAR(100), list VARCHAR(20), PRIMARY KEY (email, name), FOREIGN KEY(email) REFERENCES users(email), FOREIGN KEY(name) REFERENCES plants(name));"
                      , (err) => {
                if(err) {
                  console.log("can't create table " + err);
                  return;
                }  
                clientOrg.query("SELECT * from users WHERE email = $1", [req.query["email"]], (err, res) => {
                    if(!res.rows[0]) {
                    clientOrg.query("INSERT INTO users(email) VALUES ($1)", [req.query["email"]],
                            (err) => {
                      if(err) {
                        console.log("can't insert item into table " + err);
                      } 
                    })
                  }
                })
                  if(req.query["owned"]) {//have to change this to reflect actual light and water values
                    clientOrg.query("SELECT * from plants WHERE name = $1", [req.query["owned"]], (err, res) => {
                      if(!res.rows[0]) {
                        if(req.query["light"] && req.query["water"])  {
                          clientOrg.query("INSERT INTO plants(name, light, water, dormancy) VALUES ($1, $2, $3, $4)", [req.query["owned"], req.query["light"], req.query["water"], req.query["dormancy"]],
                          (err) => {
                            if(err) {
                              console.log("2 can't insert owned item into table " + err);
                              return;
                            } 
                          })
                        }
                        else {
                          clientOrg.query("INSERT INTO plants(name, light, water, dormancy) VALUES ($1, $2, $3, $4)", [req.query["owned"], '-1', '-1', "-1"],
                          (err) => {
                            if(err) {
                              console.log("2 can't insert owned item into table " + err);
                              return;
                            } 
                          })
                        }
                      }
                      clientOrg.query("INSERT INTO plantsByUsers(email, name, list) VALUES($1, $2, $3)", [req.query["email"], req.query["owned"], "owned"],
                        (err) => {
                          if(err) {
                            console.log("1 can't insert owned item into table " + err);
                            return;
                          } 
                        })
                    })
                    res.send("success")
                  }
                  else if(req.query["wishlist"]) {//have to change this to reflect actual light and water values
                    clientOrg.query("SELECT * from plants WHERE name = $1", [req.query["wishlist"]], (err, res) => {
                      if(!res.rows[0]) {
                        if(req.query["light"] && req.query["water"]) {
                          clientOrg.query("INSERT INTO plants(name, light, water, dormancy) VALUES ($1, $2, $3, $4)", [req.query["wishlist"], req.query["light"], req.query["water"], req.query["dormancy"]] ,
                          (err) => {
                            if(err) {
                              console.log("2 can't insert owned item into table " + err);
                              return;
                            } 
                          })
                        }
                        else {
                          clientOrg.query("INSERT INTO plants(name, light, water, dormancy) VALUES ($1, $2, $3, $4)", [req.query["wishlist"], "-1", "-1", "-1"] ,
                          (err) => {
                            if(err) {
                              console.log("2 can't insert owned item into table " + err);
                              return;
                            } 
                          })
                        }
                      }
                      clientOrg.query("INSERT INTO plantsByUsers(email, name, list) VALUES($1, $2, $3)", [req.query["email"], req.query["wishlist"], 'wishlist'],
                        (err) => {
                          if(err) {
                            console.log("1 can't insert owned item into table " + err);
                            return;
                          } 
                        })
                    })
                    res.send("success")
                  }
                  else if(req.query["lost"]) {//have to change this to reflect actual light and water values
                    clientOrg.query("SELECT * from plants WHERE name = $1", [req.query["lost"]], (err, res) => {
                      if(!res.rows[0]) {
                        if(req.query["light"] && req.query["water"])
                        {
                          //summer dormancy if name contains certain things
                          clientOrg.query("INSERT INTO plants(name, light, water, dormancy) VALUES ($1, $2, $3, $4)", [req.query["lost"], req.query["light"], req.query["water"], "summer"],
                          (err) => {
                            if(err) {
                              console.log("2 can't insert owned item into table " + err);
                              return;
                            } 
                          })
                        }
                        else {
                          clientOrg.query("INSERT INTO plants(name, light, water, dormancy) VALUES ($1, $2, $3, $4)", [req.query["lost"], "-1", "-1", "-1"],
                          (err) => {
                            if(err) {
                              console.log("2 can't insert owned item into table " + err);
                              return;
                            } 
                          })
                        }
                      }
                      clientOrg.query("INSERT INTO plantsByUsers(email, name, list) VALUES($1, $2, $3)", [req.query["email"], req.query["lost"], 'lost'],
                        (err) => {
                          if(err) {
                            console.log("1 can't insert owned item into table " + err);
                            return;
                          } 
                        })
                    })
                    res.send("success")
                  }
                  else if(req.query["remove"]) {
                    clientOrg.query("DELETE from plantsByUsers where email = $1 AND name = $2", [req.query["email"], req.query["remove"]], (err, datares) => {
                      if(err) {
                        console.log("can't remove selected item " + err);
                        return;
                      }
                      });
                      clientOrg.query("select * from plantsByUsers where email = $1", [req.query["email"]], (err, datares) => {
                        if(err) {
                          console.log("can't select plantsByUsers table " + err);
                          return;
                        }
                        res.send(datares.rows);
                      });
                  }
                  else {
                    clientOrg.query("select * from plantsByUsers where email = $1", [req.query["email"]], (err, datares) => {
                      if(err) {
                        console.log("can't select plantsByUsers table " + err);
                        return;
                      }
                      res.send(datares.rows);
                    });
                  }
                clientOrg.release();
              });
            })
          client.release();
        })
    });
});

module.exports=router;


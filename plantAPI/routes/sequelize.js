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
                clientOrg.query("SELECT * from users WHERE email = $1", [req.query["email"]], (err, datares) => {
                    if(!datares.rows[0]) {
                    clientOrg.query("INSERT INTO users(email) VALUES ($1)", [req.query["email"]],
                            (err) => {
                      if(err) {
                        console.log("can't insert item into table " + err);
                      } 
                    })
                  }
                })
                  if(req.query["owned"]) {
                    clientOrg.query("INSERT INTO plantsByUsers(email, name, list) VALUES($1, $2, $3)", [req.query["email"], req.query["owned"], "owned"],
                      (err) => {
                        if(err)
                          res.send(err)
                        else
                          res.send("success")
                      })
                  }
                  else if(req.query["wishlist"]) {
                    clientOrg.query("INSERT INTO plantsByUsers(email, name, list) VALUES($1, $2, $3)", [req.query["email"], req.query["wishlist"], 'wishlist'],
                      (err) => {
                        if(err)
                          res.send(err)
                        else
                          res.send("success")
                      })
                  }
                  else if(req.query["lost"]) {
                    clientOrg.query("INSERT INTO plantsByUsers(email, name, list) VALUES($1, $2, $3)", [req.query["email"], req.query["lost"], 'lost'],
                      (err) => {
                        if(err)
                          res.send(err)
                        else
                          res.send("success")
                      })
                  }
                  else if(req.query["remove"]) {
                    clientOrg.query("DELETE from plantsByUsers where email = $1 AND name = $2", [req.query["email"], req.query["remove"]], (err) => {
                      if(err) {
                        console.log("can't remove selected item " + err);
                        return;
                      }
                      });
                      clientOrg.query("select plants.*, pbu.list from plants, plantsbyusers pbu where pbu.email = $1 AND pbu.name = plants.name", [req.query["email"]], (err, datares) => {
                        if(err) {
                          console.log("can't select plantsByUsers table " + err);
                          return;
                        }
                        res.send(datares.rows);
                      });
                  }
                  else if(req.query["list"]) {
                    clientOrg.query("UPDATE plantsbyusers SET list=$1 where email=$2 and name=$3",[req.query['list'],req.query['email'],req.query['name']],(err) => {
                      if(err){
                        console.log(err);
                        return;
                      }
                    })
                    clientOrg.query("select plants.*, pbu.list from plants, plantsbyusers pbu where pbu.email = $1 AND pbu.name = plants.name", [req.query["email"]], (err, datares) => {
                      if(err) {
                        console.log("can't select plantsByUsers table " + err);
                        return;
                      }
                      res.send(datares.rows);
                    });
                  }
                  else if(req.query["filtered"]) {
                    var numVars=1;
                    var query="select plants.* from plants, plantsbyusers pbu where pbu.email = $1 AND pbu.name = plants.name AND pbu.list='owned'";
                    var values=[req.query['email']];
                    if(req.query['light'] > 0) {
                      values = values.concat(req.query['light'])
                      numVars+=1;
                      query = query.concat(" AND light = $" + numVars);
                    }
                    else if(req.query['water'] > 0) {
                      values = values.concat(req.query['water'])
                      numVars+=1;
                      query = query.concat(" AND water = $" + numVars);
                    }
                    else if(req.query['dormancy']!=="") {
                      values = values.concat(req.query['dormancy'])
                      numVars+=1;
                      query = query.concat(" AND dormancy = $" + numVars);
                    }
                    else if(req.query['hardiness']!=="") {
                      values = values.concat(req.query['hardiness'])
                      numVars+=1;
                      query = query.concat(" AND hardiness = $" + numVars);
                    }
                    clientOrg.query(query, values, (err, datares) => {
                      if(err) {
                        console.log("can't select plantsByUsers table " + err);
                        return;
                      }
                      res.send(datares.rows);
                    });
                  }
                  else if(req.query['sorted']) {
                    var query="select plants.* from plants, plantsbyusers pbu where pbu.email = $1 AND pbu.name = plants.name AND pbu.list='owned'";
                    if(req.query['light']) {
                      query=query.concat(" ORDER BY plants.light");
                      if(req.query['desc'])
                        query=query.concat(' DESC')
                      clientOrg.query(query, [req.query['email']], (err, datares) => {
                        if(err) {
                          console.log("can't select plantsByUsers table " + err);
                          return;
                        }
                        console.log(datares.rows)
                        res.send(datares.rows);
                      });
                    }
                    else if(req.query['water']) {
                      query=query.concat(" ORDER BY plants.water");
                      if(req.query['desc'])
                        query=query.concat(' DESC')
                      clientOrg.query(query, [req.query['email']], (err, datares) => {
                        if(err) {
                          console.log("can't select plantsByUsers table " + err);
                          return;
                        }
                        res.send(datares.rows);
                      });
                    }
                  }
                  else {
                    clientOrg.query("select plants.*, pbu.list from plants, plantsbyusers pbu where pbu.email = $1 AND pbu.name = plants.name", [req.query["email"]], (err, datares) => {
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


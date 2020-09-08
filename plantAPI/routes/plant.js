var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

router.get("/", function(req, res, next) {
    var response = null;
    (async () => {
        while(response === null) {
            response = await fetch('https://trefle.io/api/v1/plants/search?token=t6fv-ES4_jzBO5egjrzYMn0OTvitq3VbE3RKh42nu48&q='+ req.query["category"]);
        }
        const json = await response.json();
        res.send(json);
        })()
        .catch(function(error) {
            // An error happened.
            res.send(response);
        });
});

module.exports=router;
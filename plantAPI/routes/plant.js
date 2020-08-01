var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

router.get("/", function(req, res, next) {
    (async () => {
        const response = await fetch('https://trefle.io/api/v1/plants/search?token=t6fv-ES4_jzBO5egjrzYMn0OTvitq3VbE3RKh42nu48&q=coconut');
        const json = await response.json();
        // change the json to actual text information and then send
        // console.log(json);
        res.send(json);
        })();
});

module.exports=router;
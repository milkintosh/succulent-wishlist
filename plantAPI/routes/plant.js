var express = require("express");
var router = express.Router();
const fetch = require('node-fetch');

router.get("/:category", function(req, res, next) {
    var response = null;
    (async () => {
        while(response === null) {
            response = await fetch('https://trefle.io/api/v1/plants/search?token=your_token&q='+req.params.category);
        }
        console.log(response);
        const json = await response.json();
        // change the json to actual text information and then send
        res.send(json);
        })()
        .catch(function(error) {
            // An error happened.
            res.send(response);
        });
});

module.exports=router;
var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const fs = require("fs");

router.post('/', (req, res) => {

    fetch("http://localhost:8055/users",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: req.body.email,
                first_name: req.body.first_name,
                password: req.body.password
            }),
            method: "POST",
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("reg", data)
            res.json(data)
        });
});

module.exports = router;
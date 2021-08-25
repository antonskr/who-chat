var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const fs = require("fs");

router.post('/', async (req, res) => {

    const getCurrentProfile = async (value) =>
        await (await fetch(`http://localhost:8055/users?filter[email][_eq]=${value.toString()}`)).json()

    fetch("http://localhost:8055/auth/login",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: req.body.email,
                password: req.body.password
            }),
            method: "POST",
        })
        .then((response) => {
            return response.json();
        })
        .then(async (data) => {
            let obj_data = {
                access_token: data.data ? data.data.access_token : null,
                errors: {
                    error: data.errors ? data.errors[0].message : null,
                    extensions: data.errors ? data.errors[0].extensions : null
                }
            }
            if (data.data) {
                if (data.data.access_token) {
                       res.json(obj_data.user = await getCurrentProfile(req.body.email))
                    return
                }
            }
            res.json(obj_data)
        });
});

module.exports = router;
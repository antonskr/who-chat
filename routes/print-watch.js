var express = require('express');
var router = express.Router();

let user_info = {};

router.post('/', (req, res) => {
    user_info[req.body.user_id] = new Date().getDate();//Number(req.body.time[0].split(":").join(""));
    console.log(user_info)
    res.json(user_info)


    /*  res.json(user_info)*/

});

module.exports = router;
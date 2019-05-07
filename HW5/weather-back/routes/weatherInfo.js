const express = require('express');
const axios = require('axios');
const keys = require('../config/keys');

var router = express.Router();

router.get('/info', (req, res) => {
    var city = req.user.city;
    var temp;
    axios.get(getUrl(city))
        .then(response => {
            temp = response.data.main.temp;
        })
        .catch(error => {
            console.log(error);
        })
        .then(function(){
            res.status(200).json({
                "cityName": city,
                "temperature": temp
            });
        });
});

var getUrl = (cityName) => {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${keys.weatherApi}`;
};


module.exports = router;

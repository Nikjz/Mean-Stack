var express = require('express');
var router = express.Router();
const request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

let apiKey = '5cac4aeb6d69bdcc13da61d7bd25a0c3';
router.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
      console.log("error")
    } else {
      console.log(body)
      let weather = JSON.parse(body)
      if(weather.main === undefined){
        res.render('index', {weather: null, error: 'Error, try again or refresh the page'});
      } else {
        let weatherText = `${weather.name} -> ${weather.main.temp} degrees`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
module.exports = router;

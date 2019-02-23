var express = require('express');
var router = express.Router();

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.get('/get', function (req, res) {
  res.json({"string": "Hey now"})
});

router.post('/post', function (req, res) {
  let name = req.body.nikhil;
  res.json({"a":"a"});
});

module.exports = router;

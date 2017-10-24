const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API routes');
});


router.get('/markets', (req, res) => {
  res.send('');
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.resultList === undefined){
      res.render('index',
          {
          	  title: "title",
              scriptName: "/javascripts/showBirthday.js",
          }
      );
  } else {
  	  res.redirect(`birthdays?resultList=${req.query.resultList}`);
  }

});

module.exports = router;

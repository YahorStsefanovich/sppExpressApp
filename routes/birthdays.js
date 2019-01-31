var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log(JSON.parse(req.query.resultList));
	let list = JSON.parse(req.query.resultList);
	res.render('birthdays',
		{
			title: 'Friends',
			peopleList: list,
		}
	);
});

module.exports = router;
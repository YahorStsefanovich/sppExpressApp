var express = require('express');
var router = express.Router();

const bodyParser = require("body-parser");

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res, next) {
    res.render('form',
        {
            title: 'Add friend',
            perform: false,
            args: []
        }
    );
});

router.post("/", urlencodedParser, function (req, res) {
    if(!req.body)
        return res.sendStatus(400);
    res.render('form',
        {
            title: 'Add friend',
            perform: true,
            args: [req.body.firstName, req.body.lastName, new Date(req.body.birthday).getTime()],
        }
    );
});

module.exports = router;

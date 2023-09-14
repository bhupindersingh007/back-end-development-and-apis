// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// date api endpoint 
app.get("/api/:date?", function (req, res) {


  const date = req.params.date

  // empty date
  if (!date) {

    return res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    })

  }


  // timestamp
  if (!isNaN(date)) {

    return res.json({
      unix: new Date(parseInt(date)).getTime(),
      utc: new Date(parseInt(date)).toUTCString()
    })

  }

  // valid date
  if (isNaN(date) && new Date(date) != 'Invalid Date') {

    return res.json({
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString()
    })

  }

  // invalid date
  if (new Date(date) == 'Invalid Date') {

    return res.json({ error: 'Invalid Date' })

  }


});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Url = require('./models/Url')
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/public', express.static(`${process.cwd()}/public`));

mongoose.connect(process.env.MONGO_URI)


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// short url API endpoint
app.post('/api/shorturl', async function (req, res) {

  const shortUrl = await Url.count() + 1

  const url = await Url.create({
    original_url: req.body.url,
    short_url: shortUrl
  })

  res.json({
    original_url: url.originalurl,
    short_url: url.short_url
  });

});


app.get('/api/shorturl/:url', async function (req, res) {

  // validation for invalid short url  
  if (isNaN(req.params.url)) {
    return res.json({ error: 'Wrong format' })
  }


  const url = await Url.findOne({ short_url: req.params.url })

  // short url not founded
  if (!url && !isNaN(req.params.url)) {

    return res.json({ error: 'No short URL found for the given input' })

  }

  // redirect to original url with 301 status 
  res.redirect(301, url.original_url)  

})



app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
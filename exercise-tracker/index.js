const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// list all users
app.get('/api/users', (req, res) => {

  res.json([
    { _id: 1, username: 'username1' },
    { _id: 2, username: 'username2' },
    { _id: 3, username: 'username3' },
  ]);

})

// store user
app.post('/api/users', (req, res) => {

  res.json({
    _id: '5fb5853f734231456ccb3b05',
    username: 'someone'
  });

})


// store user exerices
app.post('/api/users/:_id/exercises', (req, res) => {

  res.json({
    username: 'someone',
    description: 'something',
    duration: 60,
    date: 'Mon Jan 02 1990',
    _id: '5fb5853f734231456ccb3b05'
  })

})


// user logs
app.get('/api/users/:_id/logs', (req, res) => {

  res.json({
    username: 'someone',
    count: 1,
    _id: '5fb5853f734231456ccb3b05',
    log: [
      { description: 'something', duration: 60, date: 'Mon Jan 01 1990'},
      { description: 'something', duration: 60, date: 'Mon Jan 02 1990'},
      { description: 'something', duration: 60, date: 'Mon Jan 03 1990'},
    ]
  })

})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
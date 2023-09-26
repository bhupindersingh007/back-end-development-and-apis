const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/User')
const Exercise = require('./models/Exercise')

dotenv.config()

app.use(cors())
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// list all users
app.get('/api/users', async (req, res) => {

  const users = await User.find({})

  res.json(users);

})

// store user
app.post('/api/users', async (req, res) => {

  const user = await User.create({ username: req.body.username })

  res.json({
    username: user.username,
    _id: user._id
  });

})


// store user exercise
app.post('/api/users/:_id/exercises', async (req, res) => {


  let exerciseDate = req.body.date 
    ? new Date(req.body.date).toDateString() 
    : new Date().toDateString()


  const exercise = await Exercise({
    user_id : req.body.user_id,
    description : req.body.description,
    duration : req.body.duration,
    date : exerciseDate
  })

  res.json(exercise)

})


// user logs
app.get('/api/users/:_id/logs', (req, res) => {

  res.json({
    username: 'someone',
    count: 1,
    _id: '5fb5853f734231456ccb3b05',
    log: [
      { description: 'something', duration: 60, date: 'Mon Jan 01 1990' },
      { description: 'something', duration: 60, date: 'Mon Jan 02 1990' },
      { description: 'something', duration: 60, date: 'Mon Jan 03 1990' },
    ]
  })

})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
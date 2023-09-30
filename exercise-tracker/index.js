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


  let exercise = await Exercise.create({
    user: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
    date: exerciseDate
  })

  exercise = await exercise.populate('user')

  res.json({
    _id: exercise.user._id,
    username: exercise.user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date
  })

})


// user logs
app.get('/api/users/:_id/logs', async (req, res, next) => {

  const user = await User.findOne({ _id: req.params._id })

  let exercises = await Exercise.find({ user: req.params._id }).select('-_id description duration date')

  if (req.query.from && req.query.to) {

    const fromDate = new Date(req.query.from).getTime()
    const toDate = new Date(req.query.to).getTime()

    exercises = exercises.filter(exercise => new Date(exercise.date).getTime() >= fromDate && new Date(exercise.date).getTime() <= toDate)

  }


  if (req.query.limit) {

    exercises = exercises.slice(0, req.query.limit)

  }

  return res.json({
    _id: user._id,
    username: user.username,
    count: exercises.length,
    log: exercises
  })

})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
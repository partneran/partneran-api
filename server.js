const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// JSON Web Tokens
const jwt = require('jsonwebtoken')

// Authentication
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(logger())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Users.authenticate()))
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.listen(PORT, (err) => {
  if(err){
    console.error(err);
  }else{
    console.log(`server is running in port ${PORT}`);
  }
})

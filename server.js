const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
/*
  * ROUTES
*/
const routeUsers = require('./routes/routes.api.users')
const routeAuth = require('./routes/routes.api.auth')

/*
  * Models
*/
const models = require ('./models')
const Users = models.Users

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
app.use('/api/users', routeUsers)
app.use('/api/auth', routeAuth)

// passport.use(new LocalStrategy(Users.authenticate()))
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (username, password, cb) {
      Users.findByUsername(username, function (err, user) {
          if (err) { return cb(err); }

          if (user) {
              return user.authenticate(password, cb);
          } else {
              return cb(null, false, { message: 'Incorrect password' });
          }
      });
  }))

app.use(passport.initialize());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.listen(PORT, (err) => {
  if(err){
    console.error(err);
  }else{
    console.log(`server is running in port ${PORT}`);
  }
})
/*
db name : db_partneran_dev

create table users :
sequelize model:create --name Users --attributes "userId:integer,email:string,myhash:string(1024),mysalt:string,photo_URL:string,verify:boolean"

create db_partneran_dev in postgres server, choose owner : postgres

migrate :
sequelize db:migrate

edit users model, config passport-local-sequelize

testing :
db_partneran_dev

sequelize migration:create --name add_short_bio_to_users_table

sequelize model:create --name Ideas --attributes "ideaId:integer,title:string,description:string,status:string,image:str
ing,video:string"

sequelize db:migrate

*/

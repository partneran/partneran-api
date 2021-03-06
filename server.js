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
const routeIdeas = require('./routes/routes.api.ideas')
const routeComments = require('./routes/routes.api.comments')
const routeVotes = require('./routes/routes.api.votes')
const routeReports = require('./routes/routes.api.reports')
const routeNotifs = require('./routes/routes.api.notifs')
const routeCategories = require('./routes/routes.api.categories')
const routeListApproves = require('./routes/routes.api.list_approves')

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
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}))
app.use('/api/users', routeUsers)
app.use('/api/auth', routeAuth)
app.use('/api/ideas', routeIdeas)
app.use('/api/ideas', routeComments)
app.use('/api/ideas', routeVotes)
app.use('/api/ideas', routeReports)
app.use('/api/notif', routeNotifs)
app.use('/api/categories', routeCategories)
app.use('/api/list_approves', routeListApproves)

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

MODULE USERS
create table users :
sequelize model:create --name Users --attributes "userId:integer,email:string,myhash:string(1024),mysalt:string,photo_URL:string,verify:boolean"

create db_partneran_dev in postgres server, choose owner : postgres

migrate :
sequelize db:migrate

edit users model, config passport-local-sequelize

testing :
db_partneran_dev

sequelize migration:create --name add_short_bio_to_users_table

MODULE IDEAS
sequelize model:create --name Ideas --attributes "ideaId:integer,title:string,description:string,status:string,image:str
ing,video:string"

sequelize db:migrate

add FK userId
sequelize migration:create --name add_FK_userId_to_Ideas_table

MODULE CATEGORIES
sequelize model:create --name Categories --attributes "categoryId:integer,name:string"

add FK categoryId to Ideas table
sequelize migration:create --name add_FK_categoryId_to_Ideas_table

sequelize migration:create --name add_slug_to_Ideas_table

create table comments :
sequelize model:create --name Comments --attributes "commentId:integer,content:text"

create table roles :
sequelize model:create --name Roles --attributes "roleId:integer,roles:string"

create table votes :
sequelize model:create --name Votes --attributes "voteId:integer,votes:string"

sequelize migration:create --name add_isSuper_column_to_users_table

create table reports :
sequelize model:create --name Reports --attributes "reportId:integer,reason:string,status:boolean"

create table notifications :
sequelize model:create --name Notifications --attributes "notificationId:integer,message:string,status:boolean"

create table user_notifs :
sequelize model:create --name User_notifs --attributes "user_notif_id:integer"

seeder Categories :
sequelize seed:create --name seed_categories

migrate seeder Categories
sequelize db:seed --seed seeders/20161212144451-seed_categories.js

add FK UserId to Ideas table
sequelize migration:create --name add_FK_UserId_to_Comments_table

add FK IdeaId to Ideas table
sequelize migration:create --name add_FK_IdeaId_to_Comments_table

add FK UserId to Roles table
sequelize migration:create --name add_FK_UserId_to_Roles_table

add FK IdeaId to Roles table
sequelize migration:create --name add_FK_IdeaId_to_Roles_table

add FK UserId to Votes table
sequelize migration:create --name add_FK_UserId_to_Votes_table

add FK IdeaId to Votes table
sequelize migration:create --name add_FK_IdeaId_to_Votes_table

add FK UserId to Reports table
sequelize migration:create --name add_FK_UserId_to_Reports_table

add FK IdeaId to Reports table
sequelize migration:create --name add_FK_IdeaId_to_Reports_table

add FK UserId to Notifications table
sequelize migration:create --name add_FK_UserId_to_Notifications_table

add FK IdeaId to Notifications table
sequelize migration:create --name add_FK_IdeaId_to_Notifications_table

add FK UserId to User_Notifs table
sequelize migration:create --name add_FK_UserId_to_User_Notifs_table

add FK IdeaId to User_Notifs table
sequelize migration:create --name add_FK_notificationId_to_User_Notifs_table

MODULE List_Approve
sequelize model:create --name List_approves --attributes "list_approve_id:integer,status:boolean"

add FK UserId to List_approves table
sequelize migration:create --name add_FK_UserId_to_User_List_approves_table

add FK IdeaId to List_approves table
sequelize migration:create --name add_FK_idead_to_User_List_approves_table

*/

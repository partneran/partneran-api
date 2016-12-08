# partneran-api
server side of partneran

# Dependencies
1. express
2. passport
3. jsonwebtoken
4. jwt-decode
5. express-jwt
6. morgan
7. nodemailer
8. body-parser
9. cors
10. passport-local
11. passport-local-sequelize
12. sequelize
13. pg
14. mocha
15. chai
16. dotenv

# Testing
## Integration (End Point)
`npm run test:integration`

## End to End
`npm run test:e2e`

# Database Configuration
## Users
```javascript
userId: DataTypes.INTEGER,
email: DataTypes.STRING,
myhash: DataTypes.STRING(1024),
mysalt: DataTypes.STRING,
photo_URL: DataTypes.STRING,
verify: DataTypes.BOOLEAN
```
## Roles
```javascript
roleId: DataTypes.INTEGER,
roles: DataTypes.STRING,
userId: DataTypes.INTEGER(FK),
ideaId: DataTypes.INTEGER(FK)
```
## Ideas
```javascript
ideaId: DataTypes.INTEGER,
title: DataTypes.STRING,
description: DataTypes.STRING,
status: DataTypes.STRING,
image: DataTypes.STRING,
categoryId: DataTypes.INTEGER(FK)
```
## Votes
```javascript
voteId: DataTypes.INTEGER,
title: DataTypes.STRING,
description: DataTypes.STRING,
status: DataTypes.STRING,
image: DataTypes.STRING,
categoryId: DataTypes.INTEGER(FK)
```
## Comments
```javascript
commentId: DataTypes.INTEGER,
vote: DataTypes.STRING,
status: DataTypes.BOOLEAN,
ideaId: DataTypes.INTEGER(FK),
userId: DataTypes.INTEGER(FK)
```
## Reports
```javascript
reportId: DataTypes.INTEGER,
reason: DataTypes.STRING,
status: DataTypes.BOOLEAN,
userid: DataTypes.INTEGER(FK),
ideaId: DataTypes.INTEGER(FK)
```
## Category
```javascript
categoryId: DataTypes.INTEGER,
name: DataTypes.STRING,
ideaId: DataTypes.INTEGER(FK)
```
## Notifications
```javascript
notificationId: DataTypes.INTEGER,
message: DataTypes.STRING,
ideaId: DataTypes.INTEGER(FK)
```
## User_notifs
```javascript
user_notifId: DataTypes.INTEGER,
user_receive: DataTypes.STRING,
notificationId: DataTypes.INTEGER(FK)
```

## API
Default development port and host : http://localhost:3000/

#### Users
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/users/login | POST | login user |
| /api/users | POST | process new user |
| /api/users/:id | PUT  | edit a user |
| /api/users/:id | DELETE | delete a user |

#### Ideas
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/ideas | POST | process new idea |
| /api/ideas/:ideaid | GET | process show an idea with it's comments |
| /api/ideas/:ideaid | PUT  | edit an idea |
| /api/ideas/:ideaid | DELETE | delete an idea |

#### Comments
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/ideas/:ideaid/comments/ | POST | process new comment |
| /api/ideas/:ideaid/comments/:commentid | PUT  | edit a comment |
| /api/ideas/:ideaid/comments/:commentid | DELETE | delete a comment |

#### Votes
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/ideas/:ideaid/votes/ | POST | add 1 vote |
| /api/ideas/:ideaid/votes/ | DELETE | remove 1 vote |
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
17. chai-http
18. multer

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
short_bio: DataTypes.STRING,
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
description: DataTypes.TEXT,
status: DataTypes.STRING,
image: DataTypes.STRING,
video: DataTypes.STRING,
userId: DataTypes.INTEGER(FK),
categoryId: DataTypes.INTEGER(FK)
```
## Votes
```javascript
voteId: DataTypes.INTEGER,
votes: DataTypes.STRING,
userId: DataTypes.INTEGER(FK),
ideaId: DataTypes.INTEGER(FK)
```
## Comments
```javascript
commentId: DataTypes.INTEGER,
content: DataTypes.STRING,
userId: DataTypes.INTEGER(FK),
ideaId: DataTypes.INTEGER(FK)
```
## Reports
```javascript
reportId: DataTypes.INTEGER,
reason: DataTypes.STRING,
status: DataTypes.BOOLEAN,
userId: DataTypes.INTEGER(FK),
ideaId: DataTypes.INTEGER(FK)
```
## Category
```javascript
categoryId: DataTypes.INTEGER,
name: DataTypes.STRING
```
## Notifications
```javascript
notificationId: DataTypes.INTEGER,
message: DataTypes.STRING,
status: DataTypes.BOOLEAN,
userId: DataTypes.INTEGER(FK),
ideaId: DataTypes.INTEGER(FK)
```
## User_notifs
```javascript
user_notif_id: DataTypes.INTEGER,
userId: DataTypes.INTEGER(FK),
notificationId: DataTypes.INTEGER(FK)
```

## API
Default development port and host : http://localhost:3000/

#### seeders
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/seeders | POST | seeders dummy data |

#### Users
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/users/:id | GET | get a user |
| /api/users/:id | PUT  | edit a user |
| /api/users/:id | DELETE | delete a user |
| /api/users/forgot | POST | forgot password, user submit their email |
| /api/users/password | POST | new password, user submit their new password |

#### Auth
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/auth/login | POST | login a user |
| /api/auth/signup | POST | process signup a user |

#### Verification
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/auth/verification/:token | GET | process email verification new registered user & login when user click link in their email |
| /api/auth/verification/forgot/:token | GET | show form new password email verification & login when users click link in their email |

#### Ideas
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/ideas | POST | process new idea |
| /api/ideas/:slug | GET | show an idea with it's comments |
| /api/ideas/ | GET |  show all ideas with it's comments |
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

#### Notifications
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/notif/ | POST | process new notification & passing ideaId & userId |
| /api/notif/done | POST | process mark notification as done |

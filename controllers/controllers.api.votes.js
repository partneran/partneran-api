/*
  * Models
*/
const models = require ('../models')
const Votes = models.Votes
const Users = models.Users

/*
  * method : POST
  * End Point : /api/ideas/:ideaid/votes/
*/
let upVote = (req, res) => {
  console.log(req.body);
  Votes
    .create({
      voteId: req.body.voteId,
      votes: 1,
      UserId: req.body.UserId,
      IdeaId: req.params.ideaid
    })
    .then((new_vote, err) => {
      if(err){
        console.log(err)
        res.json(err)
      }else{
        // res.json(new_vote)
        Votes.findOne({
          where: {
            id: new_vote.id
          },
          include: {
            model: Users
          }
        })
        .then((one_vote, err) => {
          if(err){
            res.json(err)
          }else{
            res.json(one_vote)
          }
        })
      }
    })
}

/*
  * method : GET
  * End Point : /api/ideas/:ideaid/votes/:voteid
*/
let getCountVote = (req, res) => {
  Votes
    .findAndCountAll({
      include: {
        model: Users
      }
    })
    .then((votes, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(votes)
      }
    })
}

let testCountVote = (req, res) => {
  Votes
    .findAndCountAll({
      where: {
        id: req.params.voteid
      }
    })
    .then((votes, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(votes)
      }
    })
}

/*
  * method : DELETE
  * End Point : /api/ideas/:ideaid/votes/:voteid
*/
let downVote = (req, res) => {
  Votes
    .destroy({
      where: {
        id: req.params.voteid
      }
    })
    .then((deleted_vote, err) => {
      if(err){
        console.log(err);
        res.json(err)
      }else{
        res.json(deleted_vote)
      }
    })
}


module.exports = {
  upVote,
  getCountVote,
  downVote,
  testCountVote
}

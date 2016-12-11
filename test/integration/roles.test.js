/*
  * testing
*/
const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)

/*
  * Models
*/
const models = require ('../../models')
const Roles = models.Roles

/*
  * URL
*/
const URL = 'http://localhost:8080'

/* ================================================ */
/*                     Testing                       */
/* ================================================ */

describe('Testing Module Roles', () => {

  beforeEach('should delete all roles from database & create new role for each testing purpose', (done) => {
    Roles
      .destroy({
        where: {}
      })
    Roles
      .create({
        roleId: 1,
        roles: "Founder"
      })
      .then(() => {
      done()
    })
  })

  afterEach('should delete all roles from database', (done) => {
    Roles
      .destroy({
        where: {}
      })
    done()
  })

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //  test model roles databases
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
    * test create a role
  */
  describe('Create one role', () => {
    it('should create one comment', (done) => {
      var new_role_testing = {
        roleId: 1,
        roles: "Founder"
      }
      Roles
        .create({
          roleId: new_role_testing.roleId,
          roles: new_role_testing.roles
        })
        .then((new_role) => {
          expect(new_role.dataValues).to.be.an('object')
          expect(new_role.dataValues).to.have.ownProperty("roleId")
          expect(new_role.dataValues).to.have.ownProperty("roles")

          new_role.roleId.should.equal(new_role_testing.roleId)
          new_role.roles.should.equal(new_role_testing.roles)

          done()
        })
    })
  })

  /*
    * test get a role
  */
  describe('Get one role', () => {
    it('should show one role', (done) => {
      Roles
      .findAll()
      .then((all_roles, err) => {
        Roles
          .findOne({
            where: {
              id: all_roles[0].id
            }
          })
          .then((one_role) => {
            expect(one_role.dataValues).to.be.an('object')
            expect(one_role.dataValues).to.have.ownProperty("roleId")
            expect(one_role.dataValues).to.have.ownProperty("roles")

            one_role.roleId.should.equal(all_roles[0].roleId)
            one_role.roles.should.equal(all_roles[0].roles)

            done()
          })
      })
    })
  })

  /*
    * test edit a role
  */
  describe('Edit one role', () => {
    it('should edit one role', (done) => {
      Roles
      .findAll()
      .then((all_roles, err) => {
        Roles
          .findOne({
            where: {
              id: all_roles[0].id
            }
          })
          .then((one_role) => {
            var new_data = {
              roles: "Co-Founder"
            }

            one_role.roles = new_data.roles
            one_role.save()

            expect(one_role.dataValues).to.be.an('object')
            expect(one_role.dataValues).to.have.ownProperty("roleId")
            expect(one_role.dataValues).to.have.ownProperty("roles")

            one_role.roleId.should.equal(all_roles[0].roleId)
            one_role.roles.should.equal(new_data.roles)

            done()
          })
      })
    })
  })

  /*
    * test delete a role
  */
  describe('Delete one role', () => {
    it('should delete one role', (done) => {
      Roles
      .findAll()
      .then((all_roles, err) => {
        Roles
          .destroy({
            where: {
              id: all_roles[0].id
            }
          })
          .then((deleted_role) => {
            expect(deleted_role).to.be.equal(1)

            done()
          })
      })
    })
  })

})

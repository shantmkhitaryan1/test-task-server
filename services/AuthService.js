const bcrypt = require('bcrypt');
const BaseService = require('./BaseService');
const { createToken } = require('../common/token');
const { users: userModel } = require("../models/index");

module.exports = class AuthService extends BaseService {

  constructor() {
    super();
  }

  async signIn(req) {
    try {
      const err = this.handleErrors(req);
      if(err.hasErrors) {
        return err.body;
      }

      const { username, password } = req.body;

      
      const user = await userModel.findOne({
        where: {username}
      })
      
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = createToken({
            payload: {
              username
            },
            secret: process.env.JWT_SECRET,
            options: {
              expiresIn: "1h"
            }
          });
        
          return this.response({
            data: {
              token,
              id: user.id,
              user: user.userName
            }
          });
      }

      return this.response({
        statusCode: 400,
        status: false,
        message: 'Incorrect username and/or password'
      });

    } catch(error) {
      return this.serverErrorResponse(error);
    }
  }

 
};

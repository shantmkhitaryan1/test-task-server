const AuthService = require("../services/AuthService");

class AuthenticationController {

  constructor() {
    this.authService = new AuthService()
  }ey

  async signIn(req, res) {
    const data = await this.authService.signIn(req);
    res.status(data.statusCode).json(data);
  }

  
  async resendVerificationToken(req, res) {
    const data = await this.authService.resendVerificationToken(req);
    res.status(data.statusCode).json(data);
  }
}

module.exports = AuthenticationController;

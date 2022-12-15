// controllers
const AuthenticationController = require('../controllers/AuthenticationController');
const authenticationController = new AuthenticationController();

// validators
const SignInValidation = require('../common/validation/SignInValidation');

const { Router } = require('express');
const router = Router();

router.post(
  '/sign-in',
  SignInValidation,
  authenticationController
    .signIn.bind(authenticationController)
);

module.exports = router;

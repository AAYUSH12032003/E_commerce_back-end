/** client will make the post/put/delete/get call on some URI and
 * route is used to intercept this request from the client
 */
const authController = require("../controllers/auth.controller");
const authMw = require("../middlewares/auth.mw");
const authMW = require("../middlewares/auth.mw");
module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/auth/signup",
    [authMW.verifySignUpBody], //incorporating the middleware into our route
    authController.signup
  ); //whenever api is this and request is POST, go to signup function of authController

  /**
   * route for POST call on "/ecomm/api/v1/auth/signin"
   */
  app.post(
    "/ecomm/api/v1/auth/signin",
    [authMW.verifySignInBody],
    authController.signin
  );
};

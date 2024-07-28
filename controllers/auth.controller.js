/**
 * here in this file we will write the controller/logic to register a user
 */
const bcrypt = require("bcryptjs");
const user_models = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config");
exports.signup = async (req, res) => {
  /*
    logic to create the user after taking all the credentials from the request body
    */
  //step1: read the request body
  const request_body = req.body; // this will get me the request body in the form of js object
  //step2: insert the data into Users collection in mongodb
  const userObj = {
    name: request_body.name,
    email: request_body.email,
    userId: request_body.userId,
    userType: request_body.userType,
    password: bcrypt.hashSync(request_body.password, 8),
  };

  try {
    const user_created = await user_models.create(userObj);
    /**
     * return this user
     */
    const res_obj = {
      name: user_created.name,
      userId: user_created.userId,
      email: user_created.email,
      userType: user_created.userType,
      createdAt: user_created.createdAt,
      updatedAt: user_created.updatedAt,
    };
    console.log("user created and returned !");
    res.status(201).send(res_obj); //give status code as 201 and send the user as response.
  } catch (err) {
    console.log("error while registering the user", err);
    res.status(500).send({
      message: "Some error occurred while registering the user",
    });
  }
  //step3: return the response back to the user
};

exports.signin = async (req, res) => {
  // first check if the userId is present in the db
  const user = await user_models.findOne({ userId: req.body.userId });
  if (user == null) {
    return res.status(400).send({
      message: "Invalid UserId",
    });
  }

  // then if the password is correct
  const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!isValidPassword) {
    return res.status(400).send({
      message: "Invalid Password",
    });
  }

  // if the userId is present and the password is correct then using JWT token we will create
  // the access token for a fixed amount of time and will return it.
  const token = jwt.sign({ id: user.userId }, secret.secret, {
    expiresIn: 320,
  });
  console.log("access token is " + token);
  try {
    res.status(200).send({
      name: user.name,
      userId: user.userId,
      userType: user.userType,
      email: user.email,
      accesstoken: token,
    });
  } catch (error) {
    console.log("error occured in signin controller", error);
  }
};

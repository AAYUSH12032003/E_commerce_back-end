/**
 * create a middleware which will check is the request body is proper and correct.
 */
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config");

const verifySignUpBody = async (req, res, next) => {
  try {
    //check for the name,email,userId
    if (!req.body.name) {
      res.status(500).send({
        message: "Failed ! Name was not provided in the request body",
      });
    }

    if (!req.body.email) {
      res.status(500).send({
        message: "Failed ! Email was not provided in the request body",
      });
    }

    if (!req.body.userId) {
      res.status(500).send({
        message: "Failed ! UserId was not provided in the request body",
      });
    }
    //check if the user with same userId already exists
    const user = await user_model.findOne({ userId: req.body.userId });
    if (user) {
      res.status(500).send({
        message: "user with the same userId already exists",
      });
    }

    next(); // command given to controller
  } catch (err) {
    console.log("error while validating the request object: " + err);
    res.status(500).send({
      message: "error while validating the request body",
    });
  }
};

const verifySignInBody = async (req, res, next) => {
  try {
    if (!req.body.user && !req.body.password) {
      return res.status(500).send({
        message: "UserId and Password are not provided in the request body",
      });
    }
    if (!req.body.userId) {
      return res.status(500).send({
        message: "Failed ! UserId was not provided in the request body",
      });
    }

    if (!req.body.password) {
      return res.status(500).send({
        message: "Failed ! Password is required",
      });
    }
    next(); // command given to controller
  } catch (error) {
    console.log("error occuring in signin middleware", error);
  }
};

/*
 * a toekn for verifying access token
 */
const verifyToken = async (req, res, next) => {
  //check if the token is present in the header of request
  const token = req.body.description;
  console.log("fetching token from headers : ", token);

  if (!token) {
    return res.status(403).send({
      message: "No token found hence unauthorized",
    });
  }
  // if the token is valid or not
  jwt.verify(token, auth_config.secret, async (error, decoded) => {
    if (error) {
      res.status(401).send({
        message: "Unauthorized !",
      });
    }
    const user = await user_model.findOne({ userId: decoded.id }); //since we passed user if while making jwt therfore we write decoded.is
    if (!user) {
      res.status(400).send({
        message: "Unauthorized ,this user for this token does not exist",
      });
    }
    // moving to the next step.
    next(); // command given to middleware
  });
};

/**
 * create a middleware which will check if the request body of category is proper or not
 */

const verifyCategoryBody = (req, res, next) => {
  //check if name , description or both are present in the request body
  try {
    if (!req.body.name && !req.body.description) {
      return res.status(500).send({
        message: "Name and description is required in the request body",
      });
    }
    if (!req.body.description) {
      return res.status(500).send({
        message: "Description is required in the request body",
      });
    }

    if (!req.body.name) {
      return res.status(500).send({
        message: "Name is required in the request body",
      });
    }
    next(); // command goes to the category controller
  } catch (error) {
    console.log("error occuring in category middleware", error);
  }
};

module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
  //verifyCategoryBody: verifyCategoryBody,
  verifyToken: verifyToken,
};

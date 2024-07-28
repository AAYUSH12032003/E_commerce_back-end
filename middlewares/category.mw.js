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
  verifyCategoryBody: verifyCategoryBody,
};

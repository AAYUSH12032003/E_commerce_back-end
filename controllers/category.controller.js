/** controller for creating the category.
 * POST call on api -> ecomm/api/vi/categories
 *
 * and request body will be like:
 * {
 *  "name":"Household",
 *  "description":"this will have all the categories items."
 * }
 */
const category_model = require("../models/category.model");

exports.createNewCategory = async (req, res) => {
  //read the request body
  // create the category object
  const cat_data = {
    name: req.body.name,
    description: req.body.description,
  };
  try {
    // insert into the mongodb database
    const category = await category_model.create(cat_data);
    // return the response of the created category
    console.log("new material and it's category is created !!");
    return res.status(200).send(category);
  } catch (error) {
    console.log("error occuring in creating category", error);
    return res.status(500).send({
      message: "error occuring in creating category and inserting it into",
    });
  }
};

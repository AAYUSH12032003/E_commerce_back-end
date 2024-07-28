/**
 * POST call on localost:8080/ecomm/api/v1/categories
 */

const category_controller = require("../controllers/category.controller");
const authMW = require("../middlewares/auth.mw");
module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    [authMW.verifyToken],
    category_controller.createNewCategory
  );
};

const mongoose = require("mongoose");

/*
 * name
 * userId
 * password
 * email
 * userType - admin or customer
 */

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    userId: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    email: {
      unique: true,
      required: true,
      minlenght: 10,
      type: String,
    },
    userType: {
      type: String,
      enum: ["ADMIN", "CUSTOMER"], // ENUM gives us the options, either user could be an admin or a customer
      default: "CUSTOMER",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);

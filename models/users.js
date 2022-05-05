//const { date } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  registered_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  membership_status: {
    type: String,
    required: true,
    default: "silver"
  }
});

module.exports = mongoose.model("Users", userSchema);

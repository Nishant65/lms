const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  book_name: {
    type: String,
    required: true
  },
  issue_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  book_return_date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Users", userSchema);

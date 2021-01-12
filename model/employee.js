const mongoose = require("mongoose");
const empSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Employee", empSchema);

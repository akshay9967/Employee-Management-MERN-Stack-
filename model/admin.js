const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  Email: String,
  Password: String,
});

module.exports = mongoose.model("Admin", adminSchema);

const mongoose = require("mongoose");

const courseschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  isactive: { type: Boolean, default:true },
  isdeleted: { type: Boolean , default:false}
});

module.exports = mongoose.model("Course", courseschema);
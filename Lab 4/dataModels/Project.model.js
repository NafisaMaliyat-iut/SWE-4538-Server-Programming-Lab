const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    default: 'Pending',
  }
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;

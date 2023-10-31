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
  status: {
    type: String,
    default: "Pending",
  },

  project_image: {
    type: String,
    default: "",
  },
  project_album: {
    type: [String],
    default: [],
  },
  project_audios: {
    type: [String],
    default: [],
  },
});

const Project = mongoose.model(
  "Project",
  ProjectSchema
);
module.exports = Project;

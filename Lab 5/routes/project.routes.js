const express = require("express");
const router = express.Router();

const { getProjectInfos, addProject, updateProject, deleteProject } = require("../controllers/project.controllers");

router.post("/add-project", addProject);
router.get("/projects", getProjectInfos);
router.patch("/update-project/:name", updateProject);
router.delete("/delete-project/:name", deleteProject);

module.exports = router;
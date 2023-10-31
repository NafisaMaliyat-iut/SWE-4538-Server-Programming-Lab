const express = require("express");
const router = express.Router();

const { getProjectInfos, addProject, updateProject, deleteProject, addProjectAlbum, addProjectImage, addProjectAudios } = require("../controllers/project.controllers");
const { uploadProjectImage, uploadAudioFile } = require("../middlewares/image.middleware");

router.post("/add-project", addProject);
router.post("/add-project-image/:name", uploadProjectImage.single('image'), addProjectImage);
router.post("/add-project-album/:name", uploadProjectImage.array('images', 5), addProjectAlbum);
router.post("/add-project-audios/:name", uploadAudioFile.array('audios', 5), addProjectAudios);
router.get("/projects", getProjectInfos);
router.patch("/update-project/:name", updateProject);
router.delete("/delete-project/:name", deleteProject);

module.exports = router;
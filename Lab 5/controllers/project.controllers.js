const Project = require("../dataModels/Project.model");
const User = require("../dataModels/User.model");

const addProject = (req, res, next) => {
  const { name, category, status } = req.body;
  const userId = req.user.id;

  console.log(name);
  console.log(category);
  console.log(status);
  console.log(userId);

  const errors = [];

  if (!name || !category) {
    errors.push("Fill out required fields!");
  }
  if (errors.length > 0) {
    res.status(400).json({ error: errors });
  } else {
    Project.findOne({ name: name }).then(
      (project) => {
        if (project) {
          errors.push(
            "Project name is already taken!"
          );
          res.status(400).json({ error: errors });
        } else {
          const newProject = new Project({
            user_id: userId,
            name: name,
            category: category,
            status: status,
          });
          newProject
            .save()
            .then(() => {
              res.json({
                message:
                  "Project Added Successfully",
              });
            })
            .catch(() => {
              errors.push("Please try again");
              res
                .status(400)
                .json({ error: errors });
            });
        }
      }
    );
  }
};

const getProjectInfos = async (req, res) => {
  try {
    const projects = await Project.find().select(
      "-user_id"
    );
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { category, status } = req.body;

    const name = req.params.name;
    const project = await Project.findOne({
      name: name,
    });
    console.log(project);

    if (category) {
      project.category = category;
    }

    if (status) {
      project.status = status;
    }

    await project.save();

    res.json({
      message:
        "Project information updated successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectName = req.params.name;
    const project = await Project.findOne({
      name: projectName,
    });

    if (!project) {
      return res.status(404).json({
        error: "Project information not found",
      });
    }

    await project.deleteOne({
      name: projectName,
    });

    res.json({
      message:
        "Project information deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

const validateRequest = (project, req) => {
  const userLoggedIn = req?.user?.id || null;
  console.log(userLoggedIn);
  if (
    userLoggedIn !== null &&
    project.user_id === req.user.id
  ) {
    return true;
  }
  return false;
};

const addProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file provided" });
    }
    const photo = req.file.filename;

    const name = req.params.name;

    const project = await Project.findOne({
      name: name,
    });

    console.log("project found!");

    const validated = validateRequest(
      project,
      req
    );
    console.log(validated);
    if (validated) {
      if (photo) {
        project.project_image = photo;
      }
      await project.save();

      res.json({
        message:
          "Project image updated successfully",
      });
    } else {
      res.json({
        message: "You do not have authorization!",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

const addProjectAlbum = async (req, res) => {
  try {
    if (!req.files) {
      return res
        .status(400)
        .json({ message: "No file provided" });
    }

    const photo = req.files.map(
      (file) => file.filename
    );

    const name = req.params.name;
    const project = await Project.findOne({
      name: name,
    });

    const validated = validateRequest(
      project,
      req
    );
    console.log(validated);

    if (validated) {
      if (photo) {
        let album = project.images || [];
        album.push(...photo);
        project.images = album;
      }
      await project.save();

      res.json({
        message:
          "Project album updated successfully",
      });
    } else {
      res.json({
        message: "You do not have authorization!",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

const addProjectAudios = async (req, res) => {
  try {
    if (!req.files) {
      return res
        .status(400)
        .json({ message: "No file provided" });
    }
    const audio = req.files.map(
      (file) => file.filename
    );

    const name = req.params.name;
    const project = await Project.findOne({
      name: name,
    });

    const validated = validateRequest(
      project,
      req
    );
    console.log(validated);

    if (validated) {
      if (audio) {
        let audios = project.project_audios || [];
        audios.push(...audios);
        project.project_audios = audios;
      }
      await project.save();

      res.json({
        message: "Audios updated successfully",
      });
    } else {
      res.json({
        message: "You do not have authorization!",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

module.exports = {
  addProject,
  getProjectInfos,
  updateProject,
  deleteProject,
  addProjectImage,
  addProjectAlbum,
  addProjectAudios,
};

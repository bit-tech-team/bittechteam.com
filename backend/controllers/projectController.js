import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getProjects = async (req, res) => {
  const projects = await Project.find({
    $or: [{ collaborators: { $in: req.user } }, { creator: { $in: req.user } }],
  }).select("-tasks");

  res.json(projects);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const newProject = async (req, res) => {
  const project = new Project(req.body);
  project.creator = req.user._id;

  try {
    const storedProject = await project.save();
    res.json(storedProject);
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id)
    .populate({
      path: "tasks",
      populate: { path: "completed", select: "name" },
    })
    .populate("collaborators", "name email");

  if (!project) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (
    project.creator.toString() !== req.user._id.toString() &&
    !project.collaborators.some(
      (collaborator) => collaborator._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error("No tienes Permisos");
    return res.status(403).json({ msg: error.message });
  }

  res.json(project);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const editProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes Permisos");
    return res.status(403).json({ msg: error.message });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.dateDelivery = req.body.dateDelivery || project.dateDelivery;
  project.client = req.body.client || project.client;

  try {
    const storedProject = await project.save();
    res.json(storedProject);
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes Permisos");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await project.deleteOne();
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const searchCollaborator = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select(
    "-confirmed -createdAt -password -token -updatedAt -__v"
  );

  if (!user) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  res.json(user);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  const { email } = req.body;

  const user = await User.findOne({ email }).select(
    "-confirmed -createdAt -password -token -updatedAt -__v"
  );

  if (!project) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.msg });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes Permisos");
    return res.status(403).json({ msg: error.msg });
  }

  if (!user) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() === user._id.toString()) {
    const error = new Error(
      "El Creador del Proyecto no puede ser Colaborador de su Proyecto"
    );
    return res.status(403).json({ msg: error.message });
  }

  if (project.collaborators.includes(user._id)) {
    const error = new Error("El Usuario ya pertenece al Proyecto");
    return res.status(403).json({ msg: error.message });
  }

  project.collaborators.push(user._id);
  await project.save();
  res.json({ msg: "Colaborador Agregado Correctamente" });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.msg });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes Permisos");
    return res.status(403).json({ msg: error.msg });
  }

  project.collaborators.pull(req.body.id);

  await project.save();
  res.json({ msg: "Colaborador Eliminado Correctamente" });
};

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteCollaborator,
  deleteProject,
  addCollaborator,
  searchCollaborator,
};

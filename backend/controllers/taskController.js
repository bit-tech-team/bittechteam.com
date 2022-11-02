import Project from "../models/Project.js";
import Task from "../models/Task.js";

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addTask = async (req, res) => {
  const { project } = req.body;

  const existProject = await Project.findById(project);

  if (!existProject) {
    const error = new Error("El Proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (existProject.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes premisos para añadir tareas");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const storedTask = await Task.create(req.body);
    existProject.tasks.push(storedTask._id);
    await existProject.save();
    res.json(storedTask);
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
const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (
    task.project.creator.toString() !== req.user._id.toString() &&
    !task.project.collaborators.some(
      (collaborator) => collaborator._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error("No tiene permisos");
    return res.status(403).json({ msg: error.message });
  }

  res.json(task);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No tiene permisos");
    return res.status(403).json({ msg: error.message });
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.dateDelivery = req.body.dateDelivery || task.dateDelivery;

  try {
    const storedTask = await task.save();
    res.json(storedTask);
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
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("No tiene permisos");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const project = await Project.findById(task.project);
    project.tasks.pull(task._id);

    await Promise.allSettled([await project.save(), await task.deleteOne()]);

    res.json({ msg: "Tarea Eliminada Correctamente" });
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
const changeState = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (
    task.project.creator.toString() !== req.user._id.toString() &&
    !task.project.collaborators.some(
      (collaborator) => collaborator._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error("No tiene permisos");
    return res.status(403).json({ msg: error.message });
  }

  task.state = !task.state;
  task.completed = req.user._id;
  await task.save();

  const storedTask = await Task.findById(id)
    .populate("project")
    .populate("completed");

  res.json(storedTask);
};

export { addTask, getTask, updateTask, deleteTask, changeState };

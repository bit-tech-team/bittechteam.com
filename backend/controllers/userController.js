import User from "../models/User.js";
import generateID from "../helpers/generateID.js";
import generateJWT from "../helpers/generateJWT.js";
import { emailSignIn, emailForgotPassword } from "../helpers/emails.js";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerUser = async (req, res) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateID();
    await user.save();

    //send email

    const { email, name, token } = user;

    emailSignIn({
      email,
      name,
      token,
    });

    res.json({
      msg: "Usuario Creado Correctamente. Revisa tu correo para confirmar tu cuenta",
    });
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
const auth = async (req, res) => {
  const { email, password } = req.body;

  // check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Usuario o contraseña incorrecto");
    return res.status(404).json({ msg: error.message });
  }

  //check if user is confirmed
  if (!user.confirmed) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //check password
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Usuario o contraseña incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });
  if (!userConfirm) {
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirmed = true;
    userConfirm.token = "";
    console.log(userConfirm);
    await userConfirm.save();
    res.json({ msg: "Usuario Confirmado Correctamente" });
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
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generateID();
    await user.save();

    //send email

    const { email, name, token } = user;

    emailForgotPassword({
      email,
      name,
      token,
    });

    res.json({ msg: "Se ha enviado un email con las intrucciones" });
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
const checkToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token });

  if (validToken) {
    res.json({ msg: "Token válido y el Usuario existe" });
  } else {
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";

    try {
      await user.save();
      res.json({ msg: "Password Modificado Correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const profile = async (req, res) => {
  const { user } = req;
  res.json(user);
};

export {
  registerUser,
  auth,
  confirm,
  profile,
  forgotPassword,
  checkToken,
  newPassword,
};

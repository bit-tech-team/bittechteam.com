import express from "express";
import {
  registerUser,
  auth,
  confirm,
  forgotPassword,
  checkToken,
  profile,
  newPassword,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// User authentication, registration and confirmation
router.post("/", registerUser);
router.post("/login", auth);
router.get("/confirm/:token", confirm);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(checkToken).post(newPassword);

router.get("/profile", checkAuth, profile);

export default router;

import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import { UserController } from "../controllers/index.js";

router.post("/login", UserController.login);
router.post("/registration", UserController.registration);
router.get("/users", authMiddleware, UserController.getUsers);
router.get("/token", authMiddleware, UserController.refreshToken);

export default router;

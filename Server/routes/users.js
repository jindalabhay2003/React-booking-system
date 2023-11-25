import express from "express";
import { register } from "../controller/authController.js";
import { login } from "../controller/authController.js";
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { updateUser, deleteUser,getUser,getUsers } from "../controller/userController.js";        
const router = express.Router();

router.post("/register", register);
router.post("/login", login);                                     
router.put("/:id",verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/",verifyAdmin, getUsers);
router.get("/:id",verifyUser, getUser);

export default router;
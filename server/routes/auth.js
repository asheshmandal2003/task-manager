import passport from "passport";
import {
  logout,
  signin,
  signup,
} from "../controllers/auth.js";
import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", passport.authenticate("local"), signin);
router.post("/logout", verifyToken, logout)

export default router;
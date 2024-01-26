import passport from "passport";
import {
  logout,
  signin,
  signup,
} from "../controllers/auth.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", passport.authenticate("local"), signin);
router.post("/logout", logout)

export default router;
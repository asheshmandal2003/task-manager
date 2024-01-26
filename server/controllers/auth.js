import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const newUser = new User({
    first_name,
    last_name,
    email,
  });
  try {
    const registeredUser = await User.register(newUser, password);
    req.logIn(registeredUser, async (err) => {
      if (err) return err;
      const token = jwt.sign(
        { id: registeredUser._id, email: registeredUser.email },
        process.env.TOKEN_SECRET
      );
      res.status(201).json({
        message: "You're succssfully registered!",
        user: registeredUser,
        token,
      });
    });
  } catch (error) {
    res.status(500).json({ message: `${error.message}!` });
  }
};

export const signin = async (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN_SECRET
  );
  res
    .status(200)
    .json({ message: "You're succssfully logged in!", user, token });
};

export const logout = async (req, res, next) => {
  req.logOut(() => {
    try {
      res.status(200).json({ message: "You're logged out!" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error!" });
    }
  });
};

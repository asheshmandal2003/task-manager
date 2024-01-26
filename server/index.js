import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { User } from "./models/user.js";
import authRouter from "./routes/auth.js";

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    console.log(res.connection.readyState);
  })
  .catch((err) => console.log(err.message));

const app = express();
const PORT = process.env.PORT;
const sessionConfig = {
  name: "Session",
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 3600000,
    expires: Date.now() + 24 * 3600000,
  },
};

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*"
  })
);
app.use(session(sessionConfig));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use("/auth", authRouter)

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import useState from "usestate";

//const { express } = require("express");
//const { mongoose } = require("mongoose");
//const { cors } = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Hammad:Hammadhammad1@cluster0.wa042.mongodb.net/authentication?retryWrites=true&w=majority",
    {
      //userNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phoneno: String,
  password: String,
});

const citySchema = mongoose.Schema({
  id: String,
  label: String,
  value: String,
});

const User = new mongoose.model("User", userSchema);
const City = new mongoose.model("City", citySchema);

//route
app.post("/Signup", async (req, res) => {
  const { name, email, phoneno, password, confirmpassword } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    console.log(oldUser);

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      phoneno,
      password: hashedPassword,
    });

    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    console.log(oldUser);

    if (!oldUser) {
      return res.status(400).json({ message: "User does not exists " });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json(oldUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/City", async (req, res) => {
  const { label, value } = req.body;

  try {
    const result = await City.create({
      label,
      value,
    });
    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/ShowCity", async (req, res) => {
  try {
    const data = await City.find({});
    //console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
app.get("/deleteCity", async (req, res) => {
  const { id } = req.body;
  try {
    await City.deleteOne({ id });
    res.status(200).json({ message: "Row Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

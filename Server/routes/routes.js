import express from "express";
import { signup, login } from "../controllers/auth.js";
import { addCity, showCity, deleteCity } from "../controllers/city.js";

const router = express.Router();

router.post("/Signup", signup);
router.post("/Login", login);
router.post("/addCity", addCity);
router.get("/ShowCity", showCity);
router.delete("/deleteCity", deleteCity);

export default router;

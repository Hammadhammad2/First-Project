import express from "express";
import cors from "cors";

import { dbConnection } from "./dbConnection.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
import appRoutes from "./routes/routes.js";

app.use("/", appRoutes);

dbConnection();

import express from "express";
import cors from "cors";
import appRoutes from "./routes/routes.js";
import bodyParser from "body-parser";

import { dbConnection } from "./dbConnection.js";

const Port =
  process.env.NODE_ENV && process.env.NODE_ENV === "test"
    ? process.env.TEST_PORT || 4000
    : process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", appRoutes);

dbConnection(app);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
import appRoutes from "./routes/routes.js";

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

app.use("/", appRoutes);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

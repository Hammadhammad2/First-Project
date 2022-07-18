import mongoose from "mongoose";
import express from "express";

export const dbConnection = () => {
  const app = express();

  mongoose
    .connect(
      "mongodb+srv://Hammad:Hammadhammad1@cluster0.wa042.mongodb.net/authentication?retryWrites=true&w=majority",
      {
        //userNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() =>
      app.listen(3001, () =>
        console.log("Database Connected, Server Running on Port: 3001")
      )
    )
    .catch((error) => console.log(`${error} did not connect`));
};

import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://Hammad:Hammadhammad1@cluster0.wa042.mongodb.net/authentication?retryWrites=true&w=majority",
      {
        //userNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() =>
      app.listen(PORT, () =>
        console.log(`Server Running on Port: http://localhost:${PORT}`)
      )
    )
    .catch((error) => console.log(`${error} did not connect`));
};

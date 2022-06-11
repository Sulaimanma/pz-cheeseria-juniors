import express = require("express");
import apiRouter from "./routes";
import mongoose = require("mongoose");

const app = express();

//Connect to mongoDB
mongoose
  .connect(
    `mongodb+srv://sulaiman:Lgp2755487@pz-cheese.cp3h9.mongodb.net/pz-cheese?retryWrites=true&w=majority`
  )
  .catch((err) => console.log("connection error", err));

//Add middleware to parse json
app.use(express.json());
app.use(express.static("public"));
app.use(apiRouter);

const port = process.env.PORT || 3200;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

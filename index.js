import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

app.get("/", (request, response) => {
  response.send(`Hello there. Greetings from port ${PORT}!`);
});

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Database connected!");
  app.listen(PORT, () => {
    console.log(`Server started listening at port ${PORT}!`);
  });
}).catch((err) => {
    console.log(`Failed database connection: ${err}`);
});

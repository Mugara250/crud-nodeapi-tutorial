import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
  response.send(`Hello there. Greetings from port ${PORT}!`);
});

app.listen(PORT, () => {
  console.log(`Server started listening at port ${PORT}!`);
});

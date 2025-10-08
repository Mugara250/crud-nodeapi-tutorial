import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Product from "./product.model.js";

const app = express();
const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

app.get("/api", (request, response) => {
  response.send("Welcome to the Products API");
});

app.get("/api/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.contentType("application/json");
    response.status(200).send(products);
  } catch (error) {
    response.status(404).send(`Failed to fetch: ${error}`);
  }
});

app.get("/api/products/:id", async (request, response) => {
  const id = request.params.id
  const product = await Product.findById(id);
  response.json(product);
})

app.post("/api/products", async (request, response) => {
  const product = new Product(request.body);
  try {
    const savedProduct = await product.save();
    response.contentType("application/json");
    response.status(201).send(savedProduct);
  } catch (error) {
    response.status(500).send(`POST request failed: ${error}`);
  }
});

app.delete("/api/products/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) response.status(404).json({ error: "Product not found!" });
    await Product.deleteOne(product);
    response.send(`Product with ${id} has been deleted in the database!`);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.delete("/api/products", async (request, response) => {
  try {
    await Product.deleteMany();
    response.send("All products in the database have been deleted!");
  } catch (error) {
    response.status(500).json({error: error.message});
  }
})

app.get("/api/check-db", (req, res) => {
  const dbInfo = {
    databaseName: mongoose.connection.db.databaseName,
    connectionState: mongoose.connection.readyState,
    connectionString: process.env.MONGODB_URI,
  };
  console.log("📊 Current DB Info:", dbInfo);
  res.json(dbInfo);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server started listening at port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.log(`Failed database connection: ${err}`);
  });

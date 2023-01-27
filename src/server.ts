import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { getAllInventory, getAllSales, getAllPurchases } from "./apicalls";
import { appendFile } from "fs";

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const app = express();
const port = 5000;
const prisma = new PrismaClient();

app.listen(port, () => {
  console.log(`YT app listening at http://localhost:${port}`);
});

app.get("/getInventory", async (req, res) => {
  const inventory = await getAllInventory();
  res.json(inventory);
});

app.get("/getSales", async (req, res) => {
  const sales = await getAllSales();
  res.json(sales);
});

app.get("/getPurchases", async (req, res) => {
  const purchases = await getAllPurchases();
  res.json(purchases);
});

apolloServer
  .listen()
  .then(({ url }) => console.log("Server is running on" + url));

import express from "express";
import { __dirname } from "../index.js";
import path from "path";
const downloadRouter = express.Router();

downloadRouter.get("/", (req, res) => {
  const filename = path.join(__dirname, "public", "env.jpg");
  res.download(filename);
});

export { downloadRouter };

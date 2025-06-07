import express from "express";
import limiter from "../config/limiter.config";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import corsConifg from "../config/cors.config";

const initalizeMiddleware = (app) => {
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsConifg));
  app.use(morgan("dev"));
  app.use(cookieParser());
};

export default initalizeMiddleware;

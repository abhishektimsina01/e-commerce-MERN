import express from "express";
import { getEnvValue } from "./utils/env.utils";
import initalizeMiddleware from "./middleware/server.middleware";
import initalizeRouter from "./routes/server.route";
import { connectDB } from "./database/connect";
import { serviceLogger } from "./libs/common.logger";

async function startServer() {
  const app = express();
  const port = getEnvValue("PORT");
  await Promise.all([initalizeMiddleware(app), initalizeRouter(app)]);
  connectDB().then(() => {
    try {
      app.listen(port, () => {
        serviceLogger.info(`Starting the Backend Server : ${port}`);
      });
    } catch (err) {
      serviceLogger.error(`Error Starting the Express Server : ${err}`);
      process.exit(1);
    }
  });
}

export default startServer;

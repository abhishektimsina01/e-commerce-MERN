import mongoose from "mongoose";
import { getEnvValue } from "../utils/env.utils";
import { serviceLogger } from "../libs/common.logger";

const connectDB = async (url) => {
  let retryCount = 5;
  let retryStatus = true;
  while (retryCount > 0 && retryStatus) {
    try {
      const connection = await mongoConnection();
      return connection;
    } catch (err) {
      const isExceeded = retryCount.toString().startsWith("0");
      if (isExceeded) {
        serviceLogger.error(
          `Error Connecting to the Database, Maximum Retry Exceeded Status :  ${!retryStatus}`
        );
        process.exit(1);
      }
      serviceLogger.info(
        `Retrying the Database Connection : Retry Count : ${retryCount + 1}`
      );
      retryCount = retryCount - 1;
      continue;
    }
  }
};

const mongoConnection = async () => {
  const mongoUrl = getEnvValue("MONGO_URL");
  const connection = await mongoose.connect(url);
  serviceLogger.info("databse connected succesfully");
  return connection;
};

export { connectDB };

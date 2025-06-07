import dotenv from "dotenv";
dotenv.config();

const getEnvValue = (key) => {
  return Object.prototype.hasOwnProperty.call(process.env, key)
    ? process.env[key]
    : null;
};

export { getEnvValue };

import { allowedOrigins, corsMethod } from "../constant/cors.constant";

const corsConifg = {
  origin: allowedOrigins,
  method: corsMethod,
  withCredentials: true,
};

export default corsConifg;

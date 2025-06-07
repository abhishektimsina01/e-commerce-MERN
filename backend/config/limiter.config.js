import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: {
    status: 429,
    message: "Too many request, please try again later",
  },
});

export default limiter;

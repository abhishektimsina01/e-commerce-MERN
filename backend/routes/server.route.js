import { Router } from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";
import { adminRouter } from "./admin.route";
import { productRouter } from "./product.route";
import { downloadRouter } from "./download.route";
import { reviewRouter } from "./review.route";

async function initalizeRouter(app) {
  app.use("/api/v1", [
    authRouter,
    userRouter,
    adminRouter,
    productRouter,
    downloadRouter,
    reviewRouter,
  ]);
  // app.use("/cart", cartRouter)
  // app.use("/order", orderRouter)
  // app.use("/orderHistory", orderHistoryRouter)
  // app.use("/payment", paymentRouter)
  // app.use("/review", reviewRouter)

  //undefined route/method and error handler
  app.use(notFound);
  app.use(errorHandler);
}

export default initalizeRouter;

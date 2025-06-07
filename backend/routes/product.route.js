import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { authorizeUser } from "../middleware/authorizedRoute.js";
// deleteOneProduct
import { upload } from "../middleware/multer.js";
import {
  createProduct,
  getOneproduct,
  getAllproduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
const productRouter = express.Router();

productRouter.post(
  "/product",
  authenticateUser,
  authorizeUser("provider"),
  upload.single("fieldname"),
  createProduct
);
productRouter.get(
  "/product",
  authenticateUser,
  authorizeUser("consumer", "provider", "admin", "superadmin"),
  getAllproduct
);
productRouter.get(
  "/product/:id",
  authenticateUser,
  authorizeUser("consumer", "provider", "admin", "superadmin"),
  getOneproduct
);
productRouter.patch(
  "/product/:id",
  authenticateUser,
  authorizeUser("consumer", "superadmin"),
  updateProduct
);
productRouter.delete(
  "/product/:id",
  authenticateUser,
  authorizeUser("provider", "superadmin"),
  deleteProduct
);
export { productRouter };

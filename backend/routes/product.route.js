import express from "express"
import { authenticateUser } from "../middleware/authenticateUser.js"
import { authorizeUser } from "../middleware/authorizedRoute.js"
// deleteOneProduct
import { upload } from "../middleware/multer.js"
import { createProduct,getOneproduct, getAllproduct, updateProduct, deleteProduct} from "../controllers/product.controller.js"
const productRouter = express.Router()

productRouter.post("/", authenticateUser, authorizeUser("provider"), createProduct)
productRouter.get("/", authenticateUser, authorizeUser("consumer", "provider", "admin", "superadmin"), getAllproduct)
productRouter.get("/:id", authenticateUser, authorizeUser("consumer", "provider", "admin", "superadmin"), getOneproduct)
productRouter.patch("/:id", authenticateUser, authorizeUser("provider", "superadmin"), updateProduct)
productRouter.delete("/:id", authenticateUser, authorizeUser("provider", "superadmin"), deleteProduct)
export {productRouter}
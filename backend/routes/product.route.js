import express from "express"
import { authenticateUser } from "../middleware/authenticateUser.js"
import { authorizeUser } from "../middleware/authorizedRoute.js"
// deleteOneProduct
import { upload } from "../middleware/multer.js"
import { createProduct, getAllproduct, getOneProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js"
const productRouter = express.Router()

productRouter.post("/", authenticateUser, authorizeUser("provider"),upload.single("fieldname"), createProduct)
productRouter.get("/", authenticateUser, authorizeUser("consumer", "provider", "admin", "superadmin"), getAllproduct)
productRouter.get("/:id", authenticateUser,authorizeUser("consumer", "admin", "superadmin"), getOneProduct)
productRouter.patch("/:id", authenticateUser, authorizeUser("consumer", "superadmin"), updateProduct)
productRouter.delete("/:id", authenticateUser, authorizeUser("provider", "superadmin"), deleteProduct)
// productRouter.delete("/", authenticateUser, authorizeUser("provider", "superadmin"), deleteOneProduct)
export {productRouter}
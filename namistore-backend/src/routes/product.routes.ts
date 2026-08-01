import { Router } from "express";

import {
    createProductController
}
from "../controllers/products/create-single-product-controller";

import {
    authenticateToken
}
from "../middleware/auth.middleware";

import {
    authorizeAdmin
}
from "../admin/middleware/admin.middleware";

import { getProductController } from "../controllers/products/get-single-product-controller";

import { getProductsController } from "../controllers/products/get-all-products-controller";

import { updateProductController } from "../controllers/products/update-single-product-controller";

import { deleteProductController } from "../controllers/products/delete-single-product-controller";

import { createReviewController } from "../controllers/reviews/create-review-controller";

import { getProductReviewsController } from "../controllers/reviews/get-product-reviews-controller";
import { updateReviewController } from "../controllers/reviews/update-review-controller";

import { deleteReviewController } from "../controllers/reviews/remove-review-controller";

import {
    activateProductController
}
from "../controllers/products/activate-single-product-controller";

import upload from "../config/multer";


const router = Router();

// router.post("/products", authenticateToken, authorizeAdmin, createProductController );
router.post("/products", authenticateToken, authorizeAdmin,upload.single("image"), createProductController );


router.get("/products", getProductsController);
router.get("/products/:id", getProductController);
// router.put("/products/:id",authenticateToken,authorizeAdmin,updateProductController);

router.put(

    "/products/:id",

    authenticateToken,

    authorizeAdmin,

    upload.single("image"),

    updateProductController

);
router.delete("/products/:id",authenticateToken,authorizeAdmin,deleteProductController);

router.post("/product/:id/reviews", authenticateToken,createReviewController);



router.get("/products/:id/reviews",getProductReviewsController);

router.put("/reviews/:id",authenticateToken,updateReviewController);

router.delete("/review/:id",authenticateToken,deleteReviewController);

router.put(
    "/products/:id/activate",

    authenticateToken,

    authorizeAdmin,

    activateProductController
);

export default router;
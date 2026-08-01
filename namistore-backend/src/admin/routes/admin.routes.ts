import { Router } from "express";

import {
    authenticateToken
}
from "../../middleware/auth.middleware";

import {
    authorizeAdmin
}
from "../middleware/admin.middleware";

import {
    getAdminProductsController
}
from "../controllers/get-admin-products-controller";

import {
    getSingleProductController
}
from "../controllers/get-single-product-controller";

const router = Router();

router.get(
    "/products",
    authenticateToken,
    authorizeAdmin,
    getAdminProductsController
);



router.get(
    "/products/:id",

    getSingleProductController
);

export default router;
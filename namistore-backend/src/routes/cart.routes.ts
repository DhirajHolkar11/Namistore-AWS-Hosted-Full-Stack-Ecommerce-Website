import { Router } from "express";

import {
    authenticateToken
}
from "../middleware/auth.middleware";

import {
    addToCartController
}
from "../controllers/cart/add-to-cart-controller";


import { getCartController } from "../controllers/cart/get-cart-controller";

import { updateCartItemController } from "../controllers/cart/update-cart-item-controller";

import { removeCartItemController } from "../controllers/cart/remove-cart-item-controller";


const router = Router();

router.post(
    "/cart",
    authenticateToken,
    addToCartController
);

router.get("/cart", authenticateToken, getCartController);

router.put("/cart/items/:id", authenticateToken,updateCartItemController);

router.delete("/cart/items/:id",authenticateToken, removeCartItemController);

export default router;
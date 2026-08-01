import { Router } from "express";

import {
    authenticateToken
} from "../middleware/auth.middleware";

import {
    addToWishlistController
} from "../controllers/wishlist/add-to-wishlist-controller";

import { getWishlistController } from "../controllers/wishlist/get-wishlist-controller";



import { removeFromWishlistController } from "../controllers/wishlist/remove-from-wishlist-controller";

const router = Router();

router.post(
    "/wishlist",
    authenticateToken,
    addToWishlistController
);


router.get("/wishlist", authenticateToken, getWishlistController);

router.delete("/wishlist/:productId",authenticateToken,removeFromWishlistController);

export default router;
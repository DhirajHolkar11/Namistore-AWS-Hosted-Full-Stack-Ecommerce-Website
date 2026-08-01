


import { Router } from "express";

import { authenticateToken }
from "../middleware/auth.middleware";

import { authorizeAdmin }
from "../admin/middleware/admin.middleware";

import {
    createCategoryController
}
from "../controllers/categories/create-category-controller";

import {
    getCategoriesController
}
from "../controllers/categories/get-categories-controller";

import {
    getCategoryController
}
from "../controllers/categories/get-category-by-id-controller";

import {
    updateCategoryController
}
from "../controllers/categories/update-category-by-id-controller";

import {
    deleteCategoryController
}
from "../controllers/categories/delete-category-by-id-controller";

const router = Router();

router.get(
    "/categories",
    getCategoriesController
);

router.get(
    "/categories/:id",
    getCategoryController
);

router.post(
    "/categories",
    authenticateToken,
    authorizeAdmin,
    createCategoryController
);

router.put(
    "/categories/:id",
    authenticateToken,
    authorizeAdmin,
    updateCategoryController
);

router.delete(
    "/categories/:id",
    authenticateToken,
    authorizeAdmin,
    deleteCategoryController
);

export default router;
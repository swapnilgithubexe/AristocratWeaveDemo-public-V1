const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReview,
  deleteReview
} = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

// Public Routes
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticated, createProductReview);
router.route("/reviews").get(getProductReview).delete(isAuthenticated, deleteReview);

// Admin Routes
router.route("/admin/product/new").post(isAuthenticated, authorizeRoles("admin"), createProduct);
router.route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

module.exports = router;

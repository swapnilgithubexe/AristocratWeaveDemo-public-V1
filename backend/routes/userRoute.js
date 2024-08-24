const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUsers, deleteUser, updateUserRole } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth")

//Routes 
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").post(logout);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword)
router.route("/me/update").put(isAuthenticated, updateProfile)

//Admin routes
router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router.route("/admin/user/:id").get(isAuthenticated, authorizeRoles("admin"), getSingleUsers).put(isAuthenticated, authorizeRoles("admin"), updateUserRole).delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

module.exports = router;
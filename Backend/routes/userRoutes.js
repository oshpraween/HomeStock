const express = require("express");
const {registerUser, loginUser, getUsers,deleteUser,updateUser,getMyUser}  = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUsers", getUsers);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/getMyUser/:id", getMyUser);

module.exports = router;

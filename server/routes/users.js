var express = require("express");
var router = express.Router();

const {
  register,
  access,
  getUserData,
  getLogged,
} = require("../controllers/user.controller");
const { Auth } = require("../middlewares");
const { authRole } = Auth;

router.post("/auth/register", register);
router.post("/auth/access", access);
router.get("/", authRole, getUserData);
router.get("/logged", authRole, getLogged);

module.exports = router;

const { Router } = require("express");
const { Signin , Signup } = require("../controllers/auth");
const { googleAuth } = require("../controllers/googleAuth");

const router = Router();

router.post("/signin", Signin);
router.post("/signup", Signup);
router.post("/google", googleAuth);

module.exports = router;

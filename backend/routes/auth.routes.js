const { Router } = require("express");
const { Signin , Signup, Me } = require("../controllers/auth");
const { googleAuth } = require("../controllers/googleAuth");
const { Verify } = require('../middleware/verify');

const router = Router();

router.post("/signin", Signin);
router.post("/signup", Signup);
router.post("/google", googleAuth);
router.get("/me",Verify, Me);

module.exports = router;

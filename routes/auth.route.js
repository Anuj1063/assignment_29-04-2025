const router = require("express").Router();
const authController = require("../controllers/auth.controller");
// const authCheck=require('../middleware/auth.middleware')()




router.post("/signup",authController.signupUser);

router.post("/signin", authController.loginUser);
// router.get('/details/:id',authCheck.authenticateAPI,authController.userDetails)


module.exports = router;

const Router = require("express").Router;
const router = new Router();
const authController=require('./controller/auth')

router.get('/', (req, res) => {
    return res.send({status:'OK',message:'Server is responding...'});
});

router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.get('/getusers',authController.showusers)

module.exports = router;
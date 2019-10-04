const router = require('express').Router()
const UserController = require('../controllers/UserController')
const {authentication, authorization} = require('../middlewares/auth')

router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.post('/signGoogle',UserController.signGoogle)
router.patch('/addWishlist', authentication, authorization, UserController.addWishlist)
router.get('/allWishlist',UserController.allWishlist)
router.patch('/delWishlist',UserController.delWishlist)


module.exports = router
const router = require('express').Router()
const avatarMiddleware = require('adorable-avatars')
const userRoutes = require('./userRoutes')
const zomatoRoutes = require('./zomatoRoutes')

router.use('/myAvatars',avatarMiddleware)
router.use('/user',userRoutes)
router.use('/zomato', zomatoRoutes)

module.exports = router
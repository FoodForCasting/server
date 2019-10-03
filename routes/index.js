const router = require('express').Router()
const avatarMiddleware = require('adorable-avatars')
// router.get('/')

router.use('/myAvatars',avatarMiddleware)


module.exports = router
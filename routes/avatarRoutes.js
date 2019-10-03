const router = require('express').Router()
const AvatarController = require('../controllers/avatarController')
// router.get('/')

router.get('/:username',AvatarController)


module.exports = router
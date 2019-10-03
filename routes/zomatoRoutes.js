const router = require('express').Router()
const ZomatoController = require('../controllers/zomatoController')

router.get('/nearby' , ZomatoController.nearby)
router.get('/search' , ZomatoController.search)



module.exports = router
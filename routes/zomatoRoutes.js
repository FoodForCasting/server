const router = require('express').Router()
const ZomatoController = require('../controllers/zomatoController')

router.get('/nearby' , ZomatoController.nearby)
router.post('/search' , ZomatoController.search)



module.exports = router
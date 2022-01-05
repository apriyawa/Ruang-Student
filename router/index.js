const Controller = require('../controller/index')
const router = require('express').Router()


router.get('/', (req, res) => res.send('home'))
router.get('/categories', Controller.getCategories)
router.get('/course', Controller.getAllCourse)


module.exports = router
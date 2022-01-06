const Controller = require('../controller/index')
const router = require('express').Router()

const middleLoginForce = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
}

const middleForceToHome = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        next()
    }
}



router.get("/", middleLoginForce, Controller.getCategories)
router.get("/login", middleForceToHome, Controller.loginForm)
router.post("/login", Controller.loginPost )
router.get("/logout", Controller.logout )
router.get("/register", Controller.registerForm )
router.post("/register", Controller.registerPost )
// router.get("/categories", Controller.viewAllCategories)

// router.get('/', (req, res) => res.send('home'))
router.get('/categories', Controller.getCategories)
router.get('/course', Controller.getAllCourse)

router.get('/categories/:CategoryId',Controller.courseDetail)

router.get('/course/add', Controller.addForm)
router.post('/course/add', Controller.createForm)
router.get('/course/:id/edit', Controller.updateForm)
router.post('/course/:id/edit', Controller.update)
router.get('/course/:id/delete', Controller.destroy)


module.exports = router
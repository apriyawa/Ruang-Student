const express = require('express')
const router = express.Router()
const Controller = require('../controllers/')

const middleLoginForce = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

const middleForceToHome = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        next()
    }
}


router.get("/", middleLoginForce, Controller.home)
router.get("/admin", middleLoginForce, Controller.homeAdmin)
router.get("/login", middleForceToHome, Controller.loginForm)
router.post("/login", Controller.loginPost )
router.get("/logout", Controller.logout )
router.get("/register", Controller.registerForm )
router.post("/register", Controller.registerPost )
router.get('/categories', (req, res)=> res.redirect("/"))
router.get('/categories/:CategoryId', Controller.courseDetail)
router.get('/categoriesAdmin/:CategoryId', Controller.courseDetailAdmin)
router.get('/course/add', Controller.addForm)
router.post('/course/add', Controller.createForm)
router.get('/course/:id/edit', Controller.updateForm)
router.post('/course/:id/edit', Controller.update)
router.get('/course/:id/delete', Controller.destroy)
router.get("/profile", Controller.myProfile)
router.get('/course', Controller.getAllCourse)




module.exports = router
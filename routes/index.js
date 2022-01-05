const express = require('express')
const router = express.Router()
const Controller = require('../controllers/')

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



router.get("/", middleLoginForce, Controller.home)
router.get("/login", middleForceToHome, Controller.loginForm)
router.post("/login", Controller.loginPost )
router.get("/logout", Controller.logout )
router.get("/register", Controller.registerForm )
router.post("/register", Controller.registerPost )
// router.get("/categories", Controller.viewAllCategories)





module.exports = router
const {Course, Category, User} = require('../models')
// const { comparePassword } = require('../helpers/bcrypt')

class Controller {

    static home(req, res){
        res.render("homepage", {username: req.session.user})
    }

    static users (req, res) {
        User.findAll()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.send(err)
            });
    }

    static loginForm (req, res){
    let error = req.query.err || null
    res.render('login', {error})
    }

    static loginPost(req, res){
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then((user) => {
                if(user && comparePassword(req.body.password, user.password)){
                    req.session.user = user.username
                    res.redirect('/')
                } else {
                    throw new Error ('error password')
                }
            })
            .catch((err) => {
                res.redirect('/login?err=' + err.message )
            });   
    }

    static logout (req, res){
        req.session.destroy(err => {
            if (err) res.send(err)
            res.redirect('/login')
        })
    }
    

    static registerForm (req, res){
        res.render('register')
    }
    
    static registerPost(req, res){
        let data = {
            username: req.body.username,
            password: req.body.password
        }
        User.create(data)
            .then((result) => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err)
            });
    }
}

module.exports = Controller
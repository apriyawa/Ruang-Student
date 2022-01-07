const {Course, Category, User} = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
var nodemailer = require('nodemailer');
const {Op} = require('sequelize')

class Controller {

    static courseDetail(req, res){
        // console.log(req.params.CategoryId);
        // console.log(req.body);
        Category.findByPk(+req.params.CategoryId)
            .then((category) => {
                return Course.findAll({ 
                    where : {
                        CategoryId: +req.params.CategoryId
                    },
                    order: [
                        ["id", "ASC"]
                    ]
                })
                .then((course) => {
                    res.render("detailCourse", {course});
                })
                .catch((err) => {
                    res.send(err.message)
                })
            })
    }

    static courseDetailAdmin(req, res){
        // console.log(req.params.CategoryId);
        // console.log(req.body);
        Category.findByPk(+req.params.CategoryId)
            .then(() => {
                return Course.findAll({ 
                    where : {
                        CategoryId: +req.params.CategoryId
                    },
                    order: [
                        ["id", "ASC"]
                    ]
                })
            })
            .then((course) => {
                res.render("courseListAdmin", {course: course});
            })
            .catch((err) => {
                res.send(err.message)
            })
        }
        

    static getAllCourse(req, res){
        let searchName = req.query.name || ""
        Course.findAll({
            include: [Category],
            where: {
                name: {
                [Op.iLike]: `%${searchName || ""}%`
                }
            },
            order: [
                ["id", "ASC"]
            ]
        })
        .then(course => {
            res.render('course', {course})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getAllCourseAdmin(req, res){
        let searchName = req.query.name || ""
        Course.findAll({
            include: [Category],
            where: {
                name: {
                [Op.iLike]: `%${searchName || ""}%`
                }
            },
            order: [
                ["id", "ASC"]
            ]
        })
        .then(course => {
            res.render('courseAdmin', {course})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static addForm(req, res){
        Category.findAll()
        .then(course =>{
            res.render('add', {course: course})
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static createForm(req, res){
    
        Course.create({ 
            name: req.body.name,
            description: req.body.description,
            duration: +req.body.duration,
            CategoryId: +req.body.CategoryId
        })
        .then(result => {
            res.redirect("/courseAdmin")
        })
        .catch(err => {
            res.send(err)
        
        })
    }

    static destroy (req, res) {
        Course.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/courseAdmin')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updateForm(req, res){
        // console.log(req.body);
        Course.getCourse(+req.params.id)
            .then((coursesNew) => {
                res.render('editCourse', {coursesNew: coursesNew});
            }).catch((err) => {
                res.send(err)
            });
    }

    static update(req, res){
        // console.log(req.body);
        Course.update({
            name: req.body.name,
            description: req.body.description,
            duration: +req.body.duration,
            CategoryId: +req.body.CategoryId
        }, {
            where: {
                id: +req.params.id
            }
        })
        .then(() => {
            res.redirect('/courseAdmin')
        })
        .catch(err => {
            res.send(err)
            console.log(err);
        })
    }

    

    static home(req, res){
        Category.findAll({
            include: [Course]
        })
        .then(category => {
            res.render('homepage', {category, username: req.session.user})
        })
        .catch(err => {
            res.send(err)
        })
        // res.render("homepage", {username: req.session.user})
    }

    static homeAdmin(req, res){
        Category.findAll({
            include: [Course]
        })
        .then(category => {
            res.render('halamanHomeAdmin', {category, username: req.session.user})
        })
        .catch(err => {
            res.send(err)
        })
        // res.render("homepage", {username: req.session.user})
    }

    static myProfile(req, res){
        res.render("myProfile", {username: req.session.user})
    }   
    
    static users(req, res) {
        User.findAll()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.send(err)
            });
    }

    static loginForm(req, res){
    let error = req.query.err || null
    res.render('login', {error})
    }

    static loginPost(req, res){
        User.findOne({
            where: {
                username: req.body.username,
                // password: req.body.password 
            }
        })
            .then((user) => {
                // if(user && comparePassword(req.body.password, user.password)){
                //     req.session.user = user.username
                //     res.redirect("/") 
                // }else if(user && comparePassword(req.body.password = "adminMantap", user.password)){
                //     req.session.user = "admin"
                //     res.redirect('/admin')
                // } else {
                //     throw new Error ('error password')
                // }
                if(user && comparePassword(req.body.password, user.password)){
                    if(user.role === 'admin'){
                        req.session.user = "admin"
                        res.redirect('/admin')
                    } else {
                        req.session.user = user.username
                        res.redirect("/") 
                    }
                } else {
                    throw new Error ('error password')
                }
            })
            .catch((err) => {
                res.redirect('/login?err=' + err.message )
            });   
    }

    static logout(req, res){
        // delete req.app.locals.user
        // res.redirect("/login")
        req.session.destroy(err => {
            if (err) res.send(err)
            res.redirect('/login')
        })
    }
    

    static registerForm(req, res){
        res.render('register')
    }
    
    static registerPost(req, res){
        let data = {
            username : req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        }
        User.create(data)
            .then((result) => {
                res.redirect('/')
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'aditya.priyawardhana02@gmail.com',
                        pass: 'dinadinadina'
                    }
                });
                var mailOptions = {
                    from: 'aditya.priyawardhana02@gmail.com',
                    to: req.body.email,
                    subject: 'Sending Email using Nodejs',
                    text: 'Selamat anda sudah bergabung di Ruang Student!'
                };
                
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    console.log('Email sent: ' + info.response);
                });
            })
            .catch((err) => {
                res.send(err)
            });
    }

  
}

module.exports = Controller
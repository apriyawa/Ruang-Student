const {Category, Course, User} = require('../models')

class controller {
    static getCategories(req, res){
        Category.findAll({
            include: [Course]
        })
        .then(category => {
            res.render('home', {category})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static courseDetail(req, res){
        // console.log(req.params.CategoryId);
        console.log(req.body);
        Category.findByPk(+req.params.CategoryId)
            .then((category) => {
                Course.findAll({ 
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


    static getAllCourse(req, res){
        Course.findAll({
            include: [Category],
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
    

    static addForm(req, res){
        Category.findAll({})
        .then(course =>{
            res.render('add', {course})
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static createForm(req, res){
        // console.log(req.body);
        Course.create({
            name: req.body.name,
            description: req.body.description,
            duration: +req.body.duration,
            CategoryId: +req.body.CategoryId
        })
        .then(() => {
            res.redirect('/course')
        })
        .catch(err => {
            res.send(err)
            // console.log(err);
        })
    }

    static destroy (req, res) {
        Course.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/course')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updateForm(req, res){
        // console.log(req.body);
        Course.getCourse(+req.params.id)
            .then((coursesNew) => {
                res.render('update', {coursesNew});
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
            res.redirect('/course')
        })
        .catch(err => {
            res.send(err)
            // console.log(err);
        })
    }

    

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

module.exports = controller
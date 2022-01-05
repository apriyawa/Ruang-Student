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

    static getAllCourse(req, res){
        Course.findAll({
            // include: [Category]
        })
        .then(course => {
            res.render('course', {course})
        })
        .catch(err => {
            res.send(err)
        })
    }

    

}

module.exports = controller
const express = require('express')
const app = express()
const session = require('express-session')
const router = require('./router/index')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
    maxAge: 60000
    }
}))

app.use('/', router)

app.listen(port, ()=>{
    console.log(`use port : ${port}`);
})
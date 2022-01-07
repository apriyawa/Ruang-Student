const express = require(`express`)
const app = express()
const router = require(`./routes`)
const session = require('express-session')
const port = process.env.port || 3051
// const port = 3051

app.set(`view engine`, `ejs`)
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
    maxAge: 600000000000
    }
}))

app.use("/", router)

app.listen(port, ()=> {
    console.log(`listening on ${port} `);
})
app.use(express.static('public'))
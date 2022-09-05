
const express = require('express')
const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// const data = require('./files/data.json');
// app.locals.mydata = data

app.use('/public', express.static('public'))
app.use('/files', express.static('files'))



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/main', (req, res) => {
    res.render('main')
})

app.get('/map', (req, res) => {
    res.render('map')
})

app.get('/explain', (req, res) => {
    res.render('explain')
})

app.get('/aboutus', (req, res) => {
    res.render('aboutus')
})

app.use(express.static('./static'));

app.listen(3000, () => {
    console.log('listening on 3000 port')
    console.log('http://localhost:3000')
})
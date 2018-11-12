const express = require('express');
const stripe = require('stripe')('api-key-here')
var hbs = require('hbs');
const bodyParser = require('body-parser')

const app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/pay-success', (req, res) => {
    res.render('pay-successfull')
})

app.post('/pay', (req, res) => {
    // Payment logic
})

app.listen(3000, () => {
    console.log('App is running on port 3000!')
})


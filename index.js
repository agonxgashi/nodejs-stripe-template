// Stripe public and private keys
const publicKey = '<YOUR_PUBLIC_KEY>'
const privateKey = '<YOUR_PRIVATE_TOKEN>'


const express = require('express')
const stripe = require('stripe')(privateKey)
const path = require('path')
const bodyParser = require('body-parser')

// Details of product and payment
const data = {
  publicToken: publicKey,
  amount: 30000, // 300.00 EUR
  currency: 'EUR',
  paymentName: 'JORDAN 1 SHOES',
  paymentDescr: 'In 1985, the Air Jordan 1 was the first multi-colored sneaker on the NBA court. It was banned by the NBA commissioner for breaking league rules—but His Airness wore it anyway. '
}

const app = express()
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Page with details of product
app.get('/', (req, res) => {
  res.render('index', { data })
})

// API endpint of charge process
app.post('/charge', (req, res) => {
  // Token of payment
  const token = req.body.stripeToken

  stripe.charges.create({
    amount: data.amount,
    currency: data.currency,
    source: token,
    description: data.paymentDescr
  }, (err, charge) => {
    if (err) {
      console.log(err)
      res.redirect('/pay-error')
    } else {
      const transaction = {
        paymentId: charge.id,
        cardBrand: charge.source.brand,
        country: charge.source.country,
        exp_month: charge.source.exp_month,
        exp_year: charge.source.exp_year,
        last4: charge.source.last4,
        email: charge.source.name,
        description: charge.description
      }
      console.log(transaction)
      res.redirect('/pay-success')
    }
  })
})

// Render this if payment was successfull
app.get('/pay-success', (req, res) => {
  res.render('pay-success')
})

// Render this if there was an error on payment process
app.get('/pay-error', (req, res) => {
  res.render('pay-error')
})

app.listen(3000, () => {
  console.log('App is running on port 3000!')
})

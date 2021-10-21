'use strict'

let app = module.exports = require('express')();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let cors = require('cors');
app.use(cors());

let port = process.env.port || 5002;


app.use('/users', require('./src/users'));
app.use('/orders', require('./src/orders'));
app.use('/products', require('./src/products'));
app.use('/areas', require('./src/areas'));
app.use('/shipment', require('./src/shipment'));
app.use('/seq', require('./src/seq'));


app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port, () => {
  console.log('server run');
});
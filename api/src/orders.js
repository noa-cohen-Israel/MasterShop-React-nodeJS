let mongoose = require('mongoose');
let express = require('express');
let email = require('./email');
let router = express.Router();

let mongoDb = 'mongodb+srv://masterShop:hEhZmwUwAwgieTpc@cluster1.mjfnd.mongodb.net/masterShop?retryWrites=true&w=majority'
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let Orders = mongoose.connection;
Orders.on('error', console.error.bind(console, 'MongoDB connection error:'));
let Schema = mongoose.Schema;
let order = new Schema(
    {
        id: { type: Number },
        products: { type: Object },
        payment: { type: Number },
        city: { type: String },
        adress: { type: String },
        numAdress: { type: Number },
        paymentToken: { type: String }
    });
let modelOrders = mongoose.model('order', order);
//get all orders
router.get("/", (req, res) => {
    modelOrders.find()
        .exec(function (err, list) {
            return res.json(list);
        })
})
//save order
//body: {id,products,payment,city,adress,numAdress,paymentToken}
router.post("/", (req, res) => {
    orderDetails = req.body
    let addOrder = new modelOrders({
        id: orderDetails.id,
        products: orderDetails.products,
        payment: orderDetails.payment,
        city: orderDetails.city,
        adress: orderDetails.adress,
        numAdress: orderDetails.numAdress,
        paymentToken: orderDetails.paymentToken
    });
    addOrder.save(function (err, data, next) {
        email.email(orderDetails.email, "הזמנתך התקבלה בהצלחה, מספר ההזמנה שלך הוא:" + orderDetails.id, orderDetails.firstName)
        return res.json("the order add");

    });

})
module.exports = router;
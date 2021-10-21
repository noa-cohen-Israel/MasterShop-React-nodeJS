let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let mongoDb = 'mongodb+srv://masterShop:hEhZmwUwAwgieTpc@cluster1.mjfnd.mongodb.net/masterShop?retryWrites=true&w=majority'
mongoose.connect(mongoDb, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let Users = mongoose.connection;
Users.on('error', console.error.bind(console, 'MongoDB connection error:'));
let Schema = mongoose.Schema;
let user = new Schema(
    {
        email: { type: String },
        id: { type: Number },
        firstName: { type: String },
        lastName: { type: String },
        phone: { type: Number },
        password: { type: String },
        ordersId: { type: Array },
        shoppingCart: { type: Object },
        payment: { type: Number }
    });
let modelUsers = mongoose.model('user', user);

//save user
//body: {firstName,lastName,phone,email,password,id,shoppingCart,payment}
router.post("/", (req, res) => {
    userDetails = req.body
    let addUser = new modelUsers({
        email: userDetails.email,
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        phone: userDetails.phone,
        password: userDetails.password,
        ordersId: userDetails.ordersId,
        shoppingCart: userDetails.shoppingCart,
        payment: userDetails.payment

    });
    addUser.save(function (err, data, next) {

        return res.json("the user add");

    });

})

//get one user by id
//query:id
//or
//get one user by email
//query:email
//or
//get one user by email and password
//query:email,password
//or
//get all users
router.get("/", (req, res) => {
    if (req.query.id) {
        modelUsers.findOne({ "id": req.query.id })
            .exec(function (err, list) {
                return res.json(list);
            })
    }
    else {
        if (req.query.email) {
            if (req.query.password) {

                modelUsers.findOne({ "email": req.query.email, "password": req.query.password })
                    .exec(function (err, list) {
                        return res.json(list);
                    })
            }
            else {
                modelUsers.findOne({ "email": req.query.email })
                    .exec(function (err, list) {
                        return res.json(list);
                    })
            }
        }
        else {
            modelUsers.find()
                .exec(function (err, list) {

                    return res.json(list);
                })
        }
    }
})
//update user
//params:id
//body:{ordersId,shoppingCart,payment}
router.put("/:id", (req, res) => {
    modelUsers.findOneAndUpdate({ "id": req.params.id }, { "ordersId": req.body.ordersId, "shoppingCart": req.body.shoppingCart, "payment": req.body.payment })
        .exec(function (err, list) {
            return res.json(list);
        })
})

module.exports = router;
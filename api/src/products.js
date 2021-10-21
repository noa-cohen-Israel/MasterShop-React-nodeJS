let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let mongoDb = 'mongodb+srv://masterShop:hEhZmwUwAwgieTpc@cluster1.mjfnd.mongodb.net/masterShop?retryWrites=true&w=majority'
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
let Products = mongoose.connection;
Products.on('error', console.error.bind(console, 'MongoDB connection error:'));
let Schema = mongoose.Schema;
let product = new Schema(
    {
        id: { type: Number },
        image: { type: String },
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        category: { type: String },
        numProducts: { type: Number },
        numProductsSold: { type: Number }
    });
let modelProduct = mongoose.model('product', product);

//get product by id 
//query: id 
//or get all products
router.get("/", (req, res) => {
    if (req.query.id) {
        modelProduct.findOne({ "id": req.query.id })
            .exec(function (err, list) {
                return res.json(list);
            })
    }
    else {
        modelProduct.find()
            .exec(function (err, list) {
                return res.json(list);
            })
    }
})
//save product
//body: {id,image,name,description,price,category,numProducts,numProductsSold}
router.post("/", (req, res) => {
    productDetails = req.body

    let addProduct = new modelProduct({
        id: productDetails.id,
        image: productDetails.image,
        name: productDetails.name,
        description: productDetails.description,
        price: productDetails.price,
        category: productDetails.category,
        numProducts: productDetails.numProducts,
        numProductsSold: productDetails.numProductsSold

    });
    addProduct.save(function (err, data, next) {

        return res.json("the order are seccfully");
    });


})
//update product
//params:id
//body: {numProducts,numProductsSold}
router.put("/:id", (req, res) => {

    modelProduct.findOneAndUpdate({ "id": req.params.id }, { "numProducts": req.body.numProducts, "numProductsSold": req.body.numProductsSold })
        .exec(function (err, list) {
            return res.json(list);
        })
})

module.exports = router;
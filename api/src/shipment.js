let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let mongoDb = 'mongodb+srv://masterShop:hEhZmwUwAwgieTpc@cluster1.mjfnd.mongodb.net/masterShop?retryWrites=true&w=majority'
mongoose.connect(mongoDb, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let Shipments = mongoose.connection;
Shipments.on('error', console.error.bind(console, 'MongoDB connection error:'));
let Schema = mongoose.Schema;
let shipment = new Schema(
    {
        id: { type: Number },
        area: { type: Number },
        date: { type: String },
        time: { type: String },
        orders: { type: Array }
    });
let modelShipment = mongoose.model('shipment', shipment);
//get one shipment by id
//query:id
//or
//get one shipment by area
//query:area
//or
//get all shipments
router.get("/", (req, res) => {
    if (req.query.id) {
        modelShipment.findOne({ "id": req.query.id })
            .exec(function (err, list) {
                return res.json(list);
            })
    }
    else {
        if (req.query.area) {
            modelShipment.find({ "area": req.query.area })
                .exec(function (err, list) {
                    return res.json(list);
                })
        }
        else {
            modelShipment.find()
                .exec(function (err, list) {
                    return res.json(list);
                })
        }
    }

})

//save shipment
//body: {id,area,date,time,orders}
router.post("/", (req, res) => {
    shipmentDetails = req.body


    let addShipment = new modelShipment({
        id: shipmentDetails.id,
        area: shipmentDetails.area,
        date: shipmentDetails.date,
        time: shipmentDetails.time,
        orders: shipmentDetails.orders
    });
    addShipment.save(function (err, data, next) {
        return res.json("the shipment added");
    });
})
//update shipment
//params: id
//body:{orders}
router.put("/:id", (req, res) => {

    modelShipment.findOneAndUpdate({ "id": req.params.id }, { "orders": req.body.orders })
        .exec(function (err, list) {
            return res.end();
        })
})
module.exports = router;
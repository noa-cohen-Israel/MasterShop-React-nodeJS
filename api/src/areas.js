let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let mongoDb = 'mongodb+srv://masterShop:hEhZmwUwAwgieTpc@cluster1.mjfnd.mongodb.net/masterShop?retryWrites=true&w=majority'
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let Areas = mongoose.connection;
Areas.on('error', console.error.bind(console, 'MongoDB connection error:'));

let Schema = mongoose.Schema;

let area = new Schema(
  {
    id: { type: Number },
    area: { type: String }
  });

let modelAreas = mongoose.model('area', area);
//get all areas
router.get("/", (req, res) => {
  modelAreas.find()
    .exec(function (err, list) {
      return res.json(list);
    })
})

//save area
//body: {id,area}
router.post("/", (req, res) => {
  areaDetails = req.body
  let addArea = new modelAreas({

    id: areaDetails.id,
    area: areaDetails.area,
  });
  addArea.save(function (err, data, next) {

    return res.json("the order are seccfully");

  });
})
module.exports = router;


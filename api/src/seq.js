let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let mongoDb = 'mongodb+srv://masterShop:hEhZmwUwAwgieTpc@cluster1.mjfnd.mongodb.net/masterShop?retryWrites=true&w=majority'
mongoose.connect(mongoDb, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let Seqs = mongoose.connection;
Seqs.on('error', console.error.bind(console, 'MongoDB connection error:'));
let Schema = mongoose.Schema;

let seq = new Schema(
  {
    lastOrder: { type: Number }
  });


let modelSeqs = mongoose.model('seq', seq);
//get one seq
router.get("/", (req, res) => {
  modelSeqs.findOne()
    .exec(function (err, list) {
      return res.json(list);
    })
})
//save seq
//body:{lastOrder}
router.post("/", (req, res) => {
  seqDetails = req.body
  let addSeq = new modelSeqs({

    lastOrder: seqDetails.lastOrder
  });
  addSeq.save(function (err, data, next) {

    return res.json("the seq added");

  });
})
//update seq
//body:{lastOrder}
router.put("/", (req, res) => {

  modelSeqs.findOneAndUpdate({}, { "lastOrder": req.body.lastOrder })
    .exec(function (err, list) {
      return res.json(list);
    })
})
module.exports = router;


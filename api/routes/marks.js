import express from 'express';
import Marks from '../../models/marks.js';
import mongoose from 'mongoose';


const router = express.Router();

router.get('/:studentID', (req,res,next) => {
    const id = req.params.studentID;
    Marks.find({uniqueID:id})
      .select('id uniqueID subject marks exam')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              marks: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/marks/:studentID'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
});

/* working for only JSON data not form data */


router.post("/", (req,res,next) => {
    console.log(req.body);
    const marks = new Marks({
        _id:  new mongoose.Types.ObjectId(),
        uniqueID: req.body.uniqueID,
        subject: req.body.subject,
        marks: req.body.marks,
        exam: req.body.exam
        

    });
    marks.save();
    res.status(201).json({
        message: 'marks entered',
        added: marks
    });
});


export default router;

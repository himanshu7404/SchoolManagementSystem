import express from 'express';
import Attendance from '../../models/attendance.js';
import mongoose from 'mongoose';

const router = express.Router();


router.get("/:uniqueID", (req,res,next) => {
    const id = req.params.uniqueID;
    Attendance.find({uniqueID:id})
      .select('id uniqueID date status')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/attendance/:uniqueID'
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


router.post("/:attendance/:uniqueID", (req,res,next) => {
    const id = req.params.uniqueID;
    const status = req.params.attendance;
    const attendance = new Attendance({
        _id:  new mongoose.Types.ObjectId(),
        uniqueID: id,
        status: status,
        date: new Date()
        

    });
    attendance.save();
    res.status(201).json({
        message: 'attendance entered',
        added: attendance
    });
});


export default router;
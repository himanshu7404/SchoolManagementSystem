import express from 'express';
import multer from 'multer';
import Student from '../../models/students.js';
import mongoose from 'mongoose';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toString() + file.originalname);
    }
});
const upload = multer({storage: storage});



const router = express.Router();


router.get('/',(req,res,next) => {
    Student.find()
    .select("id name gender dateOfBirth fatherName motherName address studentImage class contact")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            students: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    gender: doc.gender,
                    dateOfBirth: doc.dateOfBirth,
                    fatherName: doc.fatherName,
                    motherName: doc.motherName,
                    address: doc.address,
                    studentImage: doc.studentImage,
                    contact: doc.contact,
                    class: doc.class,
                    request: {
                        type:"GET",
                        url: "https://localhost:5000/students/"
                    }
                }
            })
        }
        res.status(200).json(response);
    })
     
});

router.get('/:studentID',(req,res,next) => {
    const id = req.params.studentID;
    Student.findById(id)
      .select('id name gender dateOfBirth fatherName motherName address studentImage class contact')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/students'
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


router.post('/',upload.single('studentImage'),(req,res,next) => {
    const student = new Student({
        _id:  new mongoose.Types.ObjectId(),
        name: req.body.name,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        address: req.body.address,
        class: req.body.class,
        studentImage: req.file.path,
        contact: req.body.contact
    });
    student.save();
    res.status(201).json({
        message: 'Student Added',
        addedStudent: student
    });
});


export default router;
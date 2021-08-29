import express from 'express';
import multer from 'multer';
import Teacher from '../../models/teachers.js';
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
    Teacher.find()
    .select("id name gender dateOfBirth fatherName motherName address teacherImage contact")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            Teachers: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    gender: doc.gender,
                    dateOfBirth: doc.dateOfBirth,
                    fatherName: doc.fatherName,
                    motherName: doc.motherName,
                    address: doc.address,
                    contact: doc.contact,
                    teacherImage: doc.teacherImage,
                    request: {
                        type:"GET",
                        url: "https://localhost:5000/teachers/"
                    }
                }
            })
        }
        res.status(200).json(response);
    })
     
});

router.get('/:teacherID',(req,res,next) => {
    const id = req.params.teacherID;
    Teacher.findById(id)
      .select('id name gender dateOfBirth fatherName motherName address teacherImage contact')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/teachers'
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


router.post('/',upload.single('teacherImage'),(req,res,next) => {
    const teacher = new Teacher({
        _id:  new mongoose.Types.ObjectId(),
        name: req.body.name,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        address: req.body.address,
        contact: req.body.contact,
        teacherImage: req.file.path
    });
    teacher.save();
    res.status(201).json({
        message: 'Teacher added',
        addedStudent: teacher
    });
});


export default router;
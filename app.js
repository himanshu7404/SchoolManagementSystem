import express from 'express';
import teachersRoutes from './api/routes/teachers.js';
import studentsRoutes from './api/routes/students.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://Himanshu:"+ process.env.MongoPW +"@cluster0.lequp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

  );

/*
app.use((req,res,next) => {
     res.header('Access-Control-Allow-Origin' , '*' );
     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,  Authorization');
     if(req.method == 'OPTIONS'){
         res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).json({});
     }
});
*/

app.use('/teachers',teachersRoutes);
app.use('/students',studentsRoutes);


app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
       res.status(error.status || 500);
       res.json({
           error: {
               message: error.message
           }
       })
});

export default app;
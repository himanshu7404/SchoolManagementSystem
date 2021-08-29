import mongoose from 'mongoose';

const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    address: { type: String, required: true },
    teacherImage: {type: String, required: true},
    contact: {type:Number, required:true} 

});

export default mongoose.model('Teacher', teacherSchema);
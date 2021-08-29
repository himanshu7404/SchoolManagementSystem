import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    address: { type: String, required: true },
    studentImage: {type: String, required: true},
    class: {type: Number, required:true },
    contact: {type: Number,required:true}

});

export default mongoose.model('Student', studentSchema);
import mongoose from 'mongoose';

const marksSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uniqueID: { type: String, required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
    exam: {type:String, required:true }
    

});

export default mongoose.model('Marks', marksSchema);
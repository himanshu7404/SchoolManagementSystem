import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uniqueID: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true }
    

});

export default mongoose.model('Attendance', attendanceSchema);
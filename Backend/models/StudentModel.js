
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {
      
        name: { type: String, required: true },
        
        studentId: { type: String, required: true, unique: true },
    
        email: { type: String, required: true, unique: true },
    
        major: { type: String },

        currentYear: { type: Number },
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
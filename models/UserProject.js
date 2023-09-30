const mongoose = require('mongoose');

const UserprojectSchema = new mongoose.Schema({
    project: {
        type: String, 
        required: true
    },
    developer: {  
        type: mongoose.Schema.Types.ObjectId, // This is a reference to the User schema
        ref: 'User',
        required: true
    },
    client: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'in_progress', 'cancelled'],  
        required: true
      },
  
});
module.exports=UserprojectSchema
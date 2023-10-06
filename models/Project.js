const mongoose = require('mongoose');

const ProjectcSchema = new mongoose.Schema({
    project: {
        type: String, 
        required: true
    },
    developer: {
        type: String,
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

module.exports = ProjectcSchema;
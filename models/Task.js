const mongoose=require('mongoose')
const taskSchema = new mongoose.Schema({
        name:{
            type:String,
            
        },
        completed:{
            type:Boolean,

        },
        user: {
            type: mongoose.Schema.Types.ObjectId, // This is a reference to the User schema
            ref: 'User',
            required: true
        }
})

module.exports=taskSchema
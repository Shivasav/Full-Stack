const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     firstName: { type: String, default: 'default' }, 
     lastName: { type: String, default: 'default' },  
     licenceNo: { type: String, default: 'default' },  
     age: { type: Number, default: 0 }, 
     dob: { type: Date, default: Date.now },
     username: {type : String, unique: true, required : true},
     password: {type : String, required : true}, // Store the hashed password
     userType: String,
     car_details: { 
        make: { type: String, default: 'default' }, 
        model: { type: String, default: 'default' }, 
        year: { type: Number, default: 0 }, 
        plateNo: { type: String, default: 'default' }
    },
    selectedDate: {type: Date}, 
    timeSlot:{type: String},

    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },

      //for group project
    testType:{type : String, default: 'default'},
    comment:{type : String, default: 'default'},
    testResult:{type : Boolean }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const User = require('../models/BlogPost');
const Appointment = require('../models/appointment'); 

module.exports = async (req, res) => {
    
    const userId = req.params.userId;

    const driverDetails = await User.findById(userId);

    // Fetch appointment data for the user
    const appointment = await Appointment.findOne({ _id: driverDetails.appointmentId });
    
    res.render('driverDetails', { driverDetails,appointment });
};





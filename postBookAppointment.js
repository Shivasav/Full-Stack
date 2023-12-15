const Appointment = require('../models/appointment');


async function addAppointment(req, res) {
    const { timeSlot,selectedDate } = req.body;
    // console.log(timeSlot, req.body);
    // Save the appointment slot to the database
    const newAppointment = new Appointment({ date: selectedDate, time: timeSlot, isTimeSlotAvailable: true  });
    newAppointment.save();

    let content = {
        heading : "Timeslot Added", 
        subHeading : selectedDate + ",  " + timeSlot + " added successfully."
    }
    return res.render('general',{content});
    
}

module.exports = {
    addAppointment
}
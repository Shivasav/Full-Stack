const Appointment = require('../models/appointment');

module.exports  = async function (req, res){
  const { selectedDate } = req.body;
  console.log(selectedDate);
  // Fetch available time slots for the selected date
  const existingTimeSlots = await Appointment.distinct('time', { date: selectedDate });
  // Generate all time slots (modify this based on your requirements)
  const allTimeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM','12:00 PM','12:30 PM', "1:00 PM" , "1:30 PM", "2:00 PM"]; // Fetch from your logic
	
  
  // Calculate available time slots by removing existing ones
  const availableTimeSlots = allTimeSlots.filter(slot => !existingTimeSlots.includes(slot));
  
  res.render('appointment', { allTimeSlots ,availableTimeSlots,selectedDate });
};


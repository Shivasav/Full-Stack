const Appointment = require('../models/appointment');

module.exports  = async function (req, res){
  const { selectedDate } = req.body;
  console.log(selectedDate);
  // Fetch available time slots for the selected date
  const availableTimeSlotsForUser = await Appointment.distinct('time', { date: selectedDate , isTimeSlotAvailable:true});
  // Generate all time slots (modify this based on your requirements)
  const allTimeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM','12:00 PM','12:30 PM', "1:00 PM" , "1:30 PM", "2:00 PM"]; // Fetch from your logic
  
  
  
  res.json({ allTimeSlots ,availableTimeSlotsForUser,selectedDate });
};


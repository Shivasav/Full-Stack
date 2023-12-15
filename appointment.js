// models/appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  isTimeSlotAvailable: Boolean,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

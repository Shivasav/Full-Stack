const User = require('../models/BlogPost');
const Appointment = require('../models/appointment');
const bcrypt = require('bcrypt');

async function submit(req, res) {
	try {
		const userData = req.body;
		// console.log(userData);
		const existingUser = await User.findOne({ _id: req.session.userId });
		const hashedLicenceNo = await bcrypt.hash(userData.licenceNo, 10);

		const appointment = await Appointment.findOne({
			date: new Date(userData.selectedDate),
			time: userData.timeSlot,
			isTimeSlotAvailable: true,
		});
		// console.log(appointment);
		if (appointment) {
			// Update the appointment's availability to false
			appointment.isTimeSlotAvailable = false;
			await appointment.save();

			if (existingUser) {
				// Update the existing user's data
				existingUser.firstName = userData.firstName;
				existingUser.lastName = userData.lastName;
				existingUser.age = parseInt(userData.age);
				existingUser.licenceNo = hashedLicenceNo;
				existingUser.dob = new Date(userData.dob);
				existingUser.appointmentId = appointment._id;
				existingUser.testType = userData.testType;
					existingUser.car_details = {
						make: userData.make,
						model: userData.model,
						year: parseInt(userData.year),
						plateNo: userData.plateNo,
					};
				await existingUser.save();
				content = {
                    heading: "User details saved successfully",
                    subHeading: "User data saved to Database"
                }
                res.render('general', { content });
			}

			
		} else {
			res.status(500).json({ error: 'Server error' });
		}
	} catch (error) {
		console.error('Error saving user data to MongoDB:', error);
		res.status(500).json({ error: 'Server error' });
	}
}

module.exports = {
	submit
}
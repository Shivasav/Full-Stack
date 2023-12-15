const User = require('../models/BlogPost');
const Appointment = require('../models/appointment'); // Import the Appointment model

async function updateCar(req, res) {
    try {
        const { licenceNo, make, model, year, plateNo } = req.body;
        // Update user's car details in the database
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.session.userId },
            {
                $set: {
                    'car_details.make': make,
                    'car_details.model': model,
                    'car_details.year': year,
                    'car_details.plateNo': plateNo,
                },
            },
            { new: true }
        );

        // Fetch appointment data for the user
        const appointment = await Appointment.findOne({ _id: updatedUser.appointmentId });
        res.render('gRoutes', { user: updatedUser, appointment});
    } catch (error) {
        console.error('Error in updateCar controller:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    updateCar
}
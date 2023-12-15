const User = require('../models/BlogPost');
const Appointment = require('../models/appointment'); // Import the Appointment model
const helpers = require('../helpers/helpers');

module.exports = async (req, res) => {
    try {
        // Fetch user data from the database based on the user ID stored in the session
        const userId = req.session.userId;
        const user = await User.findById(userId);

        if (helpers.areUserValuesDefault(user)) {
            res.redirect('/g2');
            return; // Add return to stop execution if redirecting
        } 

        // Fetch appointment data for the user
        const appointment = await Appointment.findOne({ _id: user.appointmentId });
        // console.log(appointment);

        if (user) {
            res.render('gRoutes', { user, appointment });
        } else {
            res.render('not-found'); // Handle the case where the user is not found
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).render('error'); // Handle the error case
    }
}

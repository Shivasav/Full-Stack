const User = require('../models/BlogPost');

// Assuming you have a route to handle fetching and filtering appointments
 async function filterAppointment(req, res){
    const selectedTestType = req.body.testType;

    try {
        // Fetch filtered appointments based on selectedTestType from the database
        const filteredAppointments = await fetchFilteredAppointments(selectedTestType);
        // console.log(filteredAppointments);
        // Render the appointments list partial view and send it back to the client
        res.render('examiner', { appointments: filteredAppointments }, (err, html) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(html);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function fetchFilteredAppointments(testType) {
   
    return await User.find({ testType: testType }).exec();
}

module.exports = {
    filterAppointment
};

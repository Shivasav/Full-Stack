const User = require('../models/BlogPost');

module.exports = async (req, res) => {
    // Fetch the driver details using userId from the database
    const userId = req.session.userId;

    const driverDetails = await User.findById(userId);


    let status = {
        testResult: driverDetails.testResult,
        comment: driverDetails.comment
    }
    res.render('result', { status });
};







const User = require('../models/BlogPost');

const listCandidatesController = async (req, res) => {
    const selectedResultType = req.body.testResult == "pass" ? true : false;

    try {
        // Fetch filtered appointments based on selectedResultType from the database
        const filteredUsers = await fetchFilteredUsers(selectedResultType);
       
        // Render the issueLicense list partial view and send it back to the client
        res.render('issueLicense', { users: filteredUsers }, (err, html) => {
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

// Helper function to fetch filtered appointments from the database
async function fetchFilteredUsers(selectedResultType) {

    return await User.find({ userType: "Driver", testResult: selectedResultType }).exec();
}


module.exports = {
    listCandidatesController,
};

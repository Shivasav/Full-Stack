const User = require('../models/BlogPost');

async function g(req, res){
	const { licenceNo } = req.body;
	// Retrieve user data from the database based on the licenseNumber
	const user = await User.findOne({ licenceNo: licenceNo });
	if (user) {
	  // Render the g.ejs page with user details
	  res.render('gRoutes', { user });
	} else {
	  // If no user found
	  res.render('not-found'); // Create a not-found.ejs for this purpose
	}
  }

module.exports = {
    g
}
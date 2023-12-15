const User = require('../models/BlogPost');
const bcrypt = require('bcrypt');

async function signup(req, res){
    try {
        const userData = req.body;
		// console.log(req.body);
        // Check if the username already exists
        const existingUser = await User.findOne({ username: userData.username }).exec();

        if (existingUser) {
            // Duplicate username
            let content = {
                heading : "Error!", 
                subHeading : "this username is already exist in database, please choose another username"
            }
            return res.render('general',{content});
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        // Create a new User instance with hashed password and default values
        const newUser = new User({
			username: userData.username,
			password: hashedPassword,
			userType: userData.userType,
			// Other fields will have their default values
		});
		
        // Save the new user to the database
        await newUser.save();
        let content = {
            heading: "Registration Successful",
            subHeading: "Now you can login!"
        }
        res.render('general', { content });
    } catch (error) {
        console.error('Error saving user data to MongoDB:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    signup
}
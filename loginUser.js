const bcrypt = require('bcrypt');
const User = require('../models/BlogPost');
const helpers = require('../helpers/helpers')

let content = {
    heading: "",
    subHeading: ""
}

module.exports = async (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username }).exec();

        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
                // store user session, will talk about it later
                req.session.userId = user._id
                req.session.userType = user.userType;
                // console.log(user.userType);
                //if usertype is driver and user values are default in database then redirect to /g2 where user can input values
                if (user.userType == "Driver" && helpers.areUserValuesDefault(user) == true) {
                    res.redirect('/g2');
                } else if (user.userType == "Driver" && helpers.areUserValuesDefault(user) == false) {
                    //if usertype is driver and user values are filled then direct to /g where user can see his details
                    res.redirect('/g');
                } else if (user.userType == "Admin") {
                    //if user his admin then redirect directly to appointmnet
                    res.redirect('/appointment');
                }else if (user.userType == "Examiner"){
                    res.redirect('/examiner');
                }
            } else {
                content = {
                    heading: "Password Incorrect",
                    subHeading: "Please login again with correct password"
                }
                res.render('general', { content });
            }
        } else {
            content = {
                heading: "No user found",
                subHeading: "Please Signup first"
            }
            res.render('general', { content });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).redirect('/login');
    }
};

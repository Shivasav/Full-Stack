const User = require('../models/BlogPost');

module.exports = async (req, res) => {
    try{
    console.log(req.params.userId);
    const userId = req.params.userId;
    const {comment, testResult}  = req.body;
    // console.log(comment, testResult);

    const updatedUser = await User.findOneAndUpdate(
        { _id: userId},
        {
            $set: {
                'comment': comment,
                'testResult': testResult
            },
        },
        { new: true }
    );


    
    let content = {
        heading: "Successful",
        subHeading: "Result has been uploaded to database."
    }
    res.render('general', { content });
    }catch(error){
        console.error('Error fetching user data:', error);
        res.status(500).render('error'); // Handle the error case
    }
}
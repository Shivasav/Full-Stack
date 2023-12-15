module.exports = (req, res, next) =>{
    if(!req.session.userId && req.session.userType == "Admin"){
    return res.redirect('/dashboard') // if user logged in, redirect to home page
    }
    next()
}
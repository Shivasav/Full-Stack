module.exports = (req, res, next) =>{
    if(!req.session.userId){
    return res.redirect('/login') // if user not logged in, redirect to home page
    }
    next()
}
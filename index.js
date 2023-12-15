// code to specify that 'express' and 'path' is required

const express = require("express")
const path = require("path")
const ejs = require("ejs")
const expressSession = require('express-session');

const mongoose = require("mongoose")

const BlogPost = require("./models/BlogPost")

const bodyParser = require("body-parser")

const getDashboard = require('./controllers/getDashboard');
const getG = require('./controllers/getG');
const getG2 = require('./controllers/getG2');
const getLogin = require('./controllers/getLogin');
const getAppointment = require('./controllers/getAppointment.js');
const getExaminer = require('./controllers/getExaminer.js');


const postG = require('./controllers/postG');
const postSignup = require('./controllers/postSignup');
const postSubmit = require('./controllers/postSubmit');
const postUpdateCar = require('./controllers/postUpdateCar');
const loginUserController = require('./controllers/loginUser');
const logoutUserController = require('./controllers/logoutUserController');
const postAvailableAppointments = require('./controllers/postAvailableAppointments.js');
const postBookAppointment = require('./controllers/postBookAppointment.js');
const postAvailableAppointmentsForUser = require('./controllers/postAvailableAppointmentsForUser.js');
const postFilterAppointments = require('./controllers/postFilterAppointments.js');
const getDriverDetails = require('./controllers/getDriverDetails.js');
const postResult = require('./controllers/postResult.js');
const postListCandidatesController = require('./controllers/postListCandidatesController.js');
const issueLicenseController = require('./controllers/getIssueLicense.js')
const getResult = require('./controllers/getResult.js')
const helpers = require('./helpers/helpers'); 

//Middlewware
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware.js');
const redirectIfNotDriverMiddleware = require('./middleware/redirectIfNotDriverMiddleware.js');
const redirectIfNotAdminMiddleware = require('./middleware/redirectIfNotAdminMiddleware.js');
const redirectIfNotExaminerMiddleware = require('./middleware/redirectIfNotExaminerMiddleware.js');


mongoose.connect(
  "mongodb+srv://shivasavbhasin:shiv123@cluster0.nqdrtu0.mongodb.net/testdatabase?retryWrites=true&w=majority&appName=AtlasApp",
  {
    useNewUrlParser: true,
  }
);
global.loggedIn = null;
global.userType = null;


const app = new express()
// app.use(express.static("public"))
app.use('/public', express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.use(expressSession({
  secret: 'Shivasav Bhasin'
}))
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  userType = req.session.userType;
  next()
});

app.locals.helpers = helpers;

// server starting
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get('/g',redirectIfAuthenticatedMiddleware, redirectIfNotDriverMiddleware, getG)

app.get('/g2',redirectIfAuthenticatedMiddleware, redirectIfNotDriverMiddleware, getG2 );

app.get('/', getDashboard );

app.get('/login', getLogin);
 
// setting up controllers
app.post('/g', redirectIfAuthenticatedMiddleware, redirectIfNotDriverMiddleware, postG.g);

app.post('/updateCar',redirectIfAuthenticatedMiddleware, redirectIfNotDriverMiddleware ,postUpdateCar.updateCar );

app.post('/submit', postSubmit.submit);

app.post('/signup', postSignup.signup);

app.post('/login',loginUserController);

app.use('/logout', logoutUserController);


app.get('/appointment',redirectIfAuthenticatedMiddleware, redirectIfNotAdminMiddleware, getAppointment);

app.post('/availableAppointments',postAvailableAppointments);

app.post('/addAppointment',postBookAppointment.addAppointment);

app.post('/availableAppointmentsForUser',postAvailableAppointmentsForUser)

//for group project 
app.get('/examiner',redirectIfAuthenticatedMiddleware,redirectIfNotExaminerMiddleware,getExaminer);

//when user select a test type below will filter users and return array of uesr
app.post('/filter-appointments',redirectIfAuthenticatedMiddleware,redirectIfNotExaminerMiddleware,postFilterAppointments.filterAppointment);

//after selecting a user from above req examiner will be directed to details of the user
app.get('/driver-details/:userId', getDriverDetails);

//below will update comment and testResult inside user db, will be done by examiner
app.post('/postResult/:userId',redirectIfAuthenticatedMiddleware,redirectIfNotExaminerMiddleware,postResult);

//below will render issueLicense page for admin
app.get('/issueLicense',redirectIfAuthenticatedMiddleware,redirectIfNotAdminMiddleware,issueLicenseController);

//below will filter user on the basis of pass/fail, will be done by admin
app.post('/filterUsers',redirectIfAuthenticatedMiddleware,redirectIfNotAdminMiddleware,postListCandidatesController.listCandidatesController);

//below will render result page for user where user can check result status
app.get('/checkResult',redirectIfAuthenticatedMiddleware,redirectIfNotDriverMiddleware,getResult);

// used because it was taking js as text/html file
app.use((req, res, next) => {
  res.set('Content-Type', 'text/javascript');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/js/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'js', 'script.js'));
});

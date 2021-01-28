const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRouters = require('./routes/profile-route');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const { MongoCloud, sessionData } = require('./config/keys');
const passport = require('passport');


const app = express();

//middleware i.e are used in this app
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [sessionData.cookieKye]
}, ));


//intialize the passport
// and define the use of the session for the login
app.use(passport.initialize());
app.use(passport.session());


//connecting to the mongoose
mongoose.connect(MongoCloud.dbUri, () => {
    console.log(`connected to the mongoDb  server`);
})




//setting 
app.set('view engine', 'ejs');



//routers 
app.get('/', (req, res) => {

    res.render('home', {
        user: req.user
    })
});
app.use('/auth', authRoutes)
app.use('/profile', profileRouters);


//listening the port number 
app.listen(3000, () => {
    console.log('server is started for listening the request on the port 3000');
})
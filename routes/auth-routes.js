const router = require('express').Router;
// this router is the factory method which 
// return the Router object
const Router = router();
const passport = require('passport');



// loging page
Router.get('/login', (req, res) => {
    res.render('login');
});


// google oauth
Router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));


Router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
})



Router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = Router;
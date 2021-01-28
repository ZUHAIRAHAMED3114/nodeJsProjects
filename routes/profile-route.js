const router = require('express').Router;
//Router is an factory function which return the Core.Router instance object
const ProfileRouter = router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}


ProfileRouter.get('/', authCheck, (req, res) => {

    res.render('profile', {
        user: req.user

    })
})

module.exports = ProfileRouter;
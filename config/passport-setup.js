const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { googleKeys } = require('./keys');
const googleStrategy = GoogleStrategy.Strategy;
const User = require('../Models/user');
// User is hold reference to the class/function of the Mongoos.Model<Mongoose.Document<Any>>



/*
   input to the oAuth2.0 for authentication
           are 1)clientID
               2)clientSecret

           client Id, and ClientSecret are both used by google Authentication
           Server to identiy to the client
           where as acessToken number is to be used to {Authentication}identified for the user...
            const inputDetails={
           clientID:'',
          clientSecret:'',
        callbackURL:''
}

callbackFunction=(accessToken,)

       
*/

//creating a serializing function which is to be used the
// cookie middleware 

passport.serializeUser((user, callback) => {
    callback(null, user.id)
});

passport.deserializeUser((id, callback) => {
    User.findById(id).then((user) => {
        callback(null, user)
    })
})




passport.use(new googleStrategy({
    clientID: googleKeys.clientId,
    clientSecret: googleKeys.clientSecret,
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, callbackdata) => {

    //check i.e if the particular user is to be exist in the dataBase then
    // doesn't insert in the Mongo Cluster...

    User.findOne({
        googleId: profile.id
    }).then((currenUser) => {
        if (currenUser) {
            console.log('this user is old user whose data is already present in the database')

            console.log(currenUser);
            callbackdata(null, currenUser)

        } else {
            console.log(`this user is the new user whose data must be store in the 
            in our data base`)

            var currenUser = new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture
                }) // this function return document object

            currenUser.save()
                .then((record) => {
                    console.log(`new user is created ${record}`);
                    callbackdata(null, record)
                })




        }

    })



    console.log(profile)
        // from the profile there is large number of data is there 
        // in i.e some data like id, displayname is to be saved in the database 


}))

module.exports = passport;
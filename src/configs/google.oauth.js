const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require("../models/user.model");

const passport=require("passport");
const { v4: uuidv4 } = require('uuid');

 require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID:  process.env.GOOGLE_CLIENT_ID,
    clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5678/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

    
    // console.log(profile._json.email)
    // console.log(uuidv4())
    // this "?" is the Optional chaning if the profilr is not there it will throw an error.
    // but if we give the ? mark for optional chaning it is now an option if it will not there it will not throw an error;
    let user= await User.findOne({email : profile?._json?.email}).lean().exec();

    if(!user){
      user =await User.create({
        email:profile._json.email,
        password:uuidv4(),
        role:["customer"]
      });
      
    }
     
    console.log(user);
    console.log(profile);
      return cb(null, user);
  
  }
));

module.exports=passport;
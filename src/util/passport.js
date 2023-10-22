const passport = require("passport");
const mongoose = require("mongoose");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt= require('bcrypt')

passport.serializeUser((user,done)=>{
    console.log("===1",user)
    if(user){
        done(null, user._id)
    }
})

passport.deserializeUser((id, done) => {
    const User = mongoose.model(`User`);
    User.findById(id, (err, user) => {
        console.log("===2",user)
        if(!err) {
            done(null,user);
        }
        else {
            done(err);
        }
    });
});

passport.use(
    new LocalStrategy({usernameField: 'email'},(email, password, done) => {
        const User = mongoose.model(`User`);
        User.findOne({ email: email.toLowerCase() })
        .then((user,err) => {
            console.log("==user==",user)
            console.log("==e==",err)
            if (err) {
                return done(err);
            }
    
            if (!user) {
                return done(null, false, { msg: `Email ${email} not found.` });
            }
            
            const res =bcrypt.compareSync(password,user.password)
            console.log(res)

            if(!res){
                return done(null, false, { msg: "Invalid email or password." });
            }
            // user.comparePassword(password, async (err, isMatch) => {
            //     if (isMatch) {
            //         let token = await user.generateAuthToken();
            //         user.token = token;
            //         return done(null, user);
            //     }

            //     return done(null, false, { msg: "Invalid email or password." });
            // });
            return done(null, user);
        })
        .catch((err) => {
            if (err) {
                return done(err);
            }
            console.log("'''''' error =''''''", err);
        });
    })
);
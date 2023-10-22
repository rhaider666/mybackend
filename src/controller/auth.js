const operation = require('../services/curd')
const Table = require('../model/user')
const passport = require('passport')
const _ = require("lodash");
const bcrypt= require('bcrypt')

const signup = async (req, res,next) => {
    try {
        const data = req.body
        console.log("==data==", data)

        const check = await operation.getsingledata({email:data.email},Table)
        console.log("==check==",check)
        if(check){
            res.status(409).send({
                status: 409,
                message: `Email Already Exist`,
            })
        }else{
            const password = await bcrypt.hash(data.password, 10);
            data.password = password;
            const user = await operation.addSingleData(data, Table)
            console.log("==user==",user)
            let token = await user.generateAuthToken();
            user.token = token;
            res.header({ "x-auth": token }).send({
                status: 200,
                message: "Account Created Successfully!",
                user: _.pick(user, ["_id", "email", "fullname", "token", "role", "phone"]),
            });
        }
    } catch (error) {
        console.log("====error===",error)
        res.status(404).send({
            status: 404,
            message: `Connectivity error try again`,
        })
    }
}

const login = async (req, res,next) => {
    try {
        const data = req.body
        console.log("==data==", data)
        passport.authenticate("local", (err,user) => {
            console.log("--user---",user)
            console.log("===err1===",err)
            if (err) {
                console.log("===err2===",err)
                res.status(401).send({
                    status: 401,
                    message: "Error in Authentication",
                });
            }

            if (!user) {
                res.status(400).send({
                    status: 400,
                    message: "Incorrect username or password",
                });
            }

            req.logIn(user, async (err) => {
                if (err) {
                    return next(err);
                }

                let token = await user.generateAuthToken();
                let data = _.pick(user, ["_id", "email", "fullname", "phone", "token" ,"dob"]);
                data.token = token;
                res.header({
                    "x-auth": token,
                })
                .status(200)
                .send({
                    status: 200,
                    message: "Success! You are logged in..",
                    user: data,
                });
            });
        })(req, res, next);

    } catch (error) {
        res.status(404).send({
            status: 404,
            message: `Connectivity error try again`,
        })
    }
}

const showusers = async (req, res) => {
    try {
        const result = await operation.getalldata(Table)
        console.log(result)
        res.status(200).send({
            status: 200,
            Records: result,
        });
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: `Error Ocurr ${error}`,
        })
    }
}

module.exports = {
    signup,
    showusers,
    login
};

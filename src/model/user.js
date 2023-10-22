const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secretKey = "tomandjerry";
const User = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
}, { timestamps: true })

User.methods.generateAuthToken = async function (extra = "") {
    let user = this;
    let access = "auth";

    let token = jwt.sign(
        {
            _id: user._id.toHexString(),
            email: user.email,
            fullname: user.fullname,
            phone: user.phone,
            dob: user.dob,
        },
        secretKey
    ).toString();
    user.token = token;

    return user.save().then(() => {
        return token;
    });
};

module.exports = mongoose.model("User", User);
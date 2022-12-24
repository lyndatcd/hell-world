const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')

const PostSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: Number, default: "Basic", required: true },
    date: { type: Date, default:Date.now }
});

PostSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id:this._id }, process.env.JWTPRIVATEKEY, { expiresin: "7d" })
    return token
};

const User = mongoose.model("user", PostSchema);
const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
}
module.exports = { User, validate };
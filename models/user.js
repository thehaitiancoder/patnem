/*
    This model is the basic user schema, each user has a basic profile and a personalized
    profile depending on the type of the user.
*/

const mongoose          = require('mongoose');
const validator         = require('validator');
const uniqueValidator   = require('mongoose-unique-validator');
const { Schema }        = mongoose;

const UserSchema        = new Schema({
    // First name of user
    fname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 35
    },
    // Middle name (s) of the user
    mname: { 
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 35
     },
     // Last name of the user
    lname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 35
    },
    // Telephone number of the user
    phone: { 
        type: String,
        trim: true,
        unique: true
    },

    // Email address of the user
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
        validator(value) {
            return validator.isEmail(value)
            }
        }
    },
    // True only after email has been verified by the user
    emailVerified: {
        type: Boolean,
        default: false
    },
    // User password
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value, cb) => {
                /*  The pwd needs to be:
                    - 8 characters minimum
                    - includes at least 1 lowercase letter
                    - inludes at least 1 uppercase letter */
                const pwdReg = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
                cb(pwdReg.test(value))
            }
        },
    },
}, {timestamps: true});

// Displaying an error when the required field value isn't unique
UserSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

module.exports          = mongoose.model('User', UserSchema);
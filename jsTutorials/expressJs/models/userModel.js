

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String, 
        required: [true, 'Please confirm your password'],
        validate: {
            // This validator will only work for save() & create() functions
            validator: function(value) {
                return value == this.password;
            },
            message: "Password with confirm pass does not match"
        }
    }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    // encrypthing the password before saving it
    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    next();
});

userSchema.methods.comparePasswordInDb = async function(pswd, pswdDb) {
    return await bcrypt.compare(pswd, pswdDb);
}

const User = mongoose.model('User', userSchema);

module.exports = User;

// still learning JWT
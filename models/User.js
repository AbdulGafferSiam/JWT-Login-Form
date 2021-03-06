const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please inside a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

// fire a function after doc saved to db / after save event
// we need to use next for any mongoose middleware or hooks
// doc refer to the saved instance
userSchema.post('save', (doc, next) => {
    console.log('new user created and saved', doc);
    next();
});

// fire a function after doc saved to db / after save event
// not use arrow function here to use 'this' keyword
// 'this' refer to the instance of the user we trying to create
userSchema.pre('save', async function (next) {
    // console.log('user about to be created and saved', this);
    
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
}

// here the model 'user' need to be singular format
// mongoose make it plural and save data on to the collection 'users'
const User = mongoose.model('user', userSchema);

module.exports = User;
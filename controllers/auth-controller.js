const User = require('../models/User');

// handle errors
const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'Email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);

        // Object.keys + Object.values
        // console.log(Object.values(err.errors));

        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(properties);
            errors[properties.path] = properties.message;
        }) 
    }

    return errors;
}


module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // async create return a promise with saved user 
        const user = await User.create({ email, password });
        // 201 - success to create the resouce
        // send back the user as json
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(email + '\n' + password);
    res.send('login');
}
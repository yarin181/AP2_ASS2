const { UsersPassName, UsersPass, Users } = require('../models/users.js');

// the POST action
const addUser = async (username, password, displayName, profilePic) => {

    // Update usersPassName table
    const newUserPassName = new UsersPassName({ username, password, displayName, profilePic });
    await newUserPassName.save();

    // Update usersPass table
    const newUserPass = new UsersPass({ username, password });
    await newUserPass.save();

    // Update users table
    const newUser = new Users({ username, displayName, profilePic });
    await newUser.save();

    return {
        newUserPassName,
        newUserPass,
        newUser
    };

};

// the GET action
const getUser = async (username) => {
    return Users.findOne({username});
};


//check if the username found when user logIn
const validUserPassword = async (username, password) => {
    const user = await UsersPass.findOne({ username });
    if (user && user.password === password) {
        return true;
    }
    return false;
};

module.exports = { getUser, addUser,validUserPassword };

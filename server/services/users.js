const { UsersPassName, UsersPass, Users} = require('../models/users.js');

const {usersData} = require('../models/users.js');
const addUser = async (username, password, displayName, profilePic) => {
    try {
        // Create a new user document
        const newUser = await new usersData({
            username,
            password,
            displayName,
            profilePic
        });

        // Save the new user to the collection
        await newUser.save();

        // Return the newly created user document
        return 200;
    } catch (error) {
        // Handle any errors that occurred during the process, user is already exist
        return 409;
    }
};

//the GET action
const getUserDetails = async (username) => {
   const user = await usersData.findOne({username: username})
    return {
        "username": username,
        "displayName" : user.displayName,
        "profilePic": user.profilePic
    }

};


//check if the username found when user logIn
const validUserPassword = async (username, password) => {
    const user = await usersData.findOne({ username });
    if (user && user.password === password) {
        return true; // Username does not exist
    }
    return false;
};


// module.exports = { getUser, addUser,validUserPassword};
module.exports = {addUser,getUserDetails,validUserPassword};


//const {validUserPassword} = require('../services/token.js');

const jwt = require("jsonwebtoken")

const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

const isLoggedInCheck = async (req,token) => {
    try {
        // Verify the token is valid
        const data = jwt.verify(token, key);
        //req.connectUser = data.username;
        return true;
    } catch (err) {
        return false;
    }
}

const getUsername = async (token) =>{
    try {
        const data = jwt.verify(token, key);
        return  data.username;
    } catch (err) {
        return null;
    }

}
const getUserToken = async (username) =>{
    // Here, we will only put the *validated* username
    const data = { username: username}
    // Generate the token.
    return  await jwt.sign(data, key)
}

// Handle login form submission

module.exports = {isLoggedInCheck,getUsername,getUserToken}

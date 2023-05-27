const {findUser} = require('../services/users.js');
const {validUserPassword} = require('../services/users.js');

const jwt = require("jsonwebtoken")

const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

const isLoggedInCheck = async (req,token) => {
    try {
        // Verify the token is valid
        const data = jwt.verify(token, key);
        req.connectUser = data.username;
        return true;
    } catch (err) {
        return false;
    }
}


// Handle login form submission


module.exports = {isLoggedInCheck,getToken}

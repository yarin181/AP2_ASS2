const service = require('../services/token.js')
const {validUserPassword} = require('../services/users.js')
const jwt = require("jsonwebtoken");
const {request} = require("express");

const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        const return_val = service.isLoggedInCheck(req,req.headers.authorization.split(" ")[1]);
        if(return_val){
            return next();
        }
        else {
            res.status(401).send("Invalid Token");
        }
    } else {
        res.status(403).send('Token required');
    }
};
const processLogIn = (req, res) => {
    // Check credentials
    const returnVal = validUserPassword(request.body.username,req.body.password)
    if (returnVal) {
        // Here, we will only put the *validated* username
        const data = { username: req.body.username }
        // Generate the token.
        const token = jwt.sign(data, key)
        // Return the token to the browser
        return res.status(201).json({ token });
    }
    else
        // Incorrect username/password. The user should try again.
        return res.status(404).send('Invalid username and/or password')
}
module.exports = {isLoggedIn ,processLogIn}

// const isLoggedIn = (req, res, next) => {
//     // If the request has an authorization header
//     if (req.headers.authorization) {
//         // Extract the token from that header
//         const token = req.headers.authorization.split(" ")[1];
//         try {
//             // Verify the token is valid
//             const data = jwt.verify(token, key);
//             req.username = data.username; // Assign username to req.username
//             // Token validation was successful.
//             return next();
//         } catch (err) {
//             return res.status(401).send("Invalid Token");
//         }
//     } else {
//         return res.status(403).send('Token required');
//     }
// };
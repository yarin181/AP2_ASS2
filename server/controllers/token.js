const service = require('../services/token.js')
const {validUserPassword} = require('../services/users.js')
const isLoggedIn = async (req, res, next) => {
    //console.log("in isLogIn")
    // If the request has an authorization header
    if (req.headers.authorization) {
        const tokenJson = req.headers.authorization.split(" ")[1]
        data = JSON.parse(tokenJson)
        const tokenValue = data['token']
        console.log("token -",req.headers.authorization.split(" ")[1].valueOf());
        console.log("token in 12 -",tokenJson);
        const return_val = await service.isLoggedInCheck(tokenValue);
        console.log("is log in return val -",return_val);
        if (return_val) {
            req.headers.connectedUser = return_val.username
            console.log("return val- ", return_val.username);
            console.log("connectUser- ", req.headers.connectedUser);
            return next();
        } else {
            res.status(401).send("Invalid Token");
        }
    } else {
        res.status(403).send('Token required');
    }
};
const processLogIn = async (req, res) => {
    // Check credentials
    const returnVal = await validUserPassword(req.body.username, req.body.password)
    if (returnVal) {
        const token = await service.getUserToken(req.body.username);
        // Return the token to the browser
        return res.status(201).json({token});
    } else {
        //console.log("in else");
        // Incorrect username/password. The user should try again.
        return res.status(404).send('Invalid username and/or password')
    }

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
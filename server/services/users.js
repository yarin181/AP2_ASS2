const { UsersPassName, UsersPass, Users} = require('../models/users.js');

// the POST action
const addUser = async (username, password, displayName, profilePic) => {
    //there is already username like this in the data

    const result = await UsersPassName.findOne({ [username]: username });
    //console.log(result);
    if(!result){
        //console.log("username already exists");
        return null;
    }
    // Update usersPassName table
    const newUserPassName = await new UsersPassName({ username, password, displayName, profilePic });
    await newUserPassName.save();

    //console.log("use registered - ",newUserPassName);
    // Update usersPass table
    const newUserPass =await new UsersPass({ username, password });
    await newUserPass.save();

    // Update users table
    const newUser = await new Users({ username, displayName, profilePic });
    await newUser.save();

    return {
        newUserPassName,
        newUserPass,
        newUser
    };

};

// the GET action
const getUser = async (username) => {
    //console.log("in get user",username)
    const user = await Users.findOne({username: username});
    //console.log("the get user is - " , user);
    return user;
};


//check if the username found when user logIn
const validUserPassword = async (username, password) => {
    const user = await UsersPass.findOne({ username });
    if (!user){
        return false
    }else{
        return await user.password === password
    }
    // console.log("user is: ",user);


    // return return_val;

};

module.exports = { getUser, addUser,validUserPassword};

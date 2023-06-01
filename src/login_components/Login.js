
import icon from "../img/logo-noBack.png"
import "./login_style.css"
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";
import io from "socket.io-client";



function Login(props){

    //if the user haven't signed up yet - this is for the sign-up button
    const [needToSignUp, setNeedToSignUp] = useState(false);
    //if the user is a registered user
    const [isRegisteredUser,setIsRegisteredUser]=useState(false)
    //this is for getting the username and the password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //check if the user submitted the form or not
    const [wrongUser,setIsWrongUser] = useState(false)

    const [usernameClassContent,setUsernameClassContent] = useState('form-control log-in-input')
    const [passwordClassContent,setPasswordClassContent] = useState('form-control log-in-input')
    const socket = io("http://localhost:5000");



    //handling every input change
    function handlePasswordChange(event) {
        setPassword(event.target.value);
        setPasswordClassContent("form-control log-in-input");

    }
    function handleUsernameChange(event) {
        setUsername(event.target.value);
        setUsernameClassContent("form-control log-in-input");

    }
    //pressing the sign-up button
    function signUp() {
        setNeedToSignUp(true);
    }

    //pressing the log-in button
    async function handleSubmit(event) {
        event.preventDefault();
        const user = {
            username: username,
            password: password
        };

        //finding the user
        const validToken = await getToken(user);
        if(validToken){
            // socket.emit("foo", "bar");
            props.setCurrentUser(user);
            props.setIsConnected(true);
            setIsRegisteredUser(true);
        }else{
            setUsernameClassContent("form-control is-invalid log-in-input")
            setPasswordClassContent("form-control is-invalid log-in-input")
            setIsWrongUser(true)
        }



        // const user = props.usersList.find(c => c.username === username);
        //the user exists and the password is correct:
        // if (!(user === undefined)) {
        //     if (user.password === password) {


            // }
        // }

    }


    useEffect(() => {
        // socket.on("connect", () => {
        //     console.log("Connected to WebSocket server");
        // });
        //
        // socket.on("disconnect", () => {
        //     console.log("Disconnected from WebSocket server");
        // });
        //
        // socket.on("Hello", (data) => {
        //     console.log("Received 'Hello' message:", data);
        // });
    //
    //     socket.on("hi", () => {
    //         console.log("Received 'hi' message");
    //     });
    //
    //     socket.on("message", (msg) => {
    //         console.log("Received message:", msg);
    //     });
    //
    //     // Clean up the WebSocket connection when the component is unmounted
    //     return () => {
    //         socket.disconnect();
    //     };
    }, []);

   async function getToken(user) {
        //create the json user
        try {
            const response = await fetch('http://localhost:5000/api/Tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            //console.log("after get token",await response.text());
            if (response.ok) {
                const reader = await response.text()

                props.setToken(reader)
                // const decoder = new TextDecoder(); // Create a TextDecoder
                // let token = ''; // Variable to store the concatenated stream chunks
               return 1
                // while (true) {
                //     // Read the next chunk from the stream
                //     const { done, value } = await reader.read();
                //     // Exit the loop if there are no more chunks to read
                //     if (done) break;
                //     // Decode the chunk using the TextDecoder
                //     const chunk = decoder.decode(value);
                //     // Concatenate the decoded chunk
                //     token += chunk;
                //     props.setToken(token)
                //     console.log(token);
                //     return 1;
                // }
            } else {
                // Handle the case when the token request was unsuccessful
                console.error('Token request failed:', response.status);
                return 0
            }
        } catch (error) {
            console.error('Error occurred while fetching the token:', error);
            return 0
        }
    }


    //navigate to different pages
    if (needToSignUp) {
        return <Navigate to="/registerPage" />;
    }
    if(isRegisteredUser){
        return <Navigate to="/chat" />;
    }


    return(
        <div
            className="card border-dark col-lg-12 col-md-10 col-sm-10 col-xs-6"
            id="log-in-card"
        >
            <img id="logo" src={icon} alt="unloaded"/>
            <form onSubmit={handleSubmit} noValidate >
                <div id="log-in-box">
                    <label htmlFor="username">Username:</label>
                    <input onChange={handleUsernameChange} className={usernameClassContent} type="text" id="username" name="username" />
                    <br />
                    <label  htmlFor="password">Password:</label>
                    <input onChange={handlePasswordChange} className={passwordClassContent}  type="password" id="password" name="password" />
                    {wrongUser ? (
                        <p id="alert_message">
                            username or password is incorrect
                        </p>
                    ) : (
                        <p id="alert_message">

                        </p>
                    )}
                    <br/>
                    <div id="log-in-button-box">
                        <button
                            id="log-in-btn"
                            type="submit"
                            className="btn btn-outline-dark"
                        >
                            LOG IN
                        </button>
                        <br />
                        <a id="sign-up-btn" onClick={signUp} className="btn btn-outline-dark">SIGN UP</a>
                    </div>
                </div>
            </form>
        </div>
);

}
export default Login;
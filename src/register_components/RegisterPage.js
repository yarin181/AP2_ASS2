import "./register_style.css"
import icon from "../img/logo.jpeg"
import placeholder from "../img/profile.png"
import React, {useState} from "react";
import InputBar from "./InputBar";
import {Navigate} from "react-router-dom";
import async from "async";


function RegisterPage(props) {
    //the parameters:
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [imageSrc, setImageSrc] = useState(placeholder);
    //in case the user is registered - pressing the sign-in button
    const [isRegistered , setIsRegistered] = useState(false);
    //if the user is valid
    const [isValidUser, setIsValidUser]=useState(false)

    //variable for the password validity
    const [validPassword, setIsValid] = useState(false);
    //variable for the ConfirmPassword
    //const [isConfirm, setIsConfirm] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    //these are for alerting when the input is in valid
    const [alertUserName,setAlertUserName] = useState(false)
    const [alertPassword,setAlertPassword] = useState(false)
    const [alertConfirm,setAlertConfirm] = useState(false)
    const [alertDisplay,setAlertDisplay] = useState(false)

    const [inputClass,setInputClass]=useState('input-register-style form-control')
    const [submitAlert,setSubmitAlert]=useState(false)
    // const [isImageExist,setIsImageExist]=useState('')

    //checking if the image exist after the submit
    const [validImage,setIsValidImage]=useState(false)
    const [imageClass,setImageClass]=useState("btn btn-register input-register-style form-control")
    const [imageCircleClass,setImageCircleClass]=useState("user-photo rounded-circle")
    const [imageAlertMessage,setImageAlertMessage]=useState("")

    // const inputRef = useRef(null);
    //the function validate the uploaded pic
    function passwordValidation(password){
        const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,16}$/
        setIsValid(passwordRegex.test(password));

    }

    //the function validate the password
    function picValidation(picFileName){
        const regex = /([^\\s]+(\.(?:jpe?g|png|gif|bmp|JPG))$)/;
        return (regex.test(picFileName));
        //setIsValid(passwordRegex.test(picFileName));
    }
      //the function confirmPassword
    function passwordConfirm(confirmPassword){
       if((confirmPassword === password) && (validPassword)){
           setIsConfirm(true);
       }else{
           setIsConfirm(false);
       }
    }



    //handling every input change
    const handleImageChange = (e) => {

        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            const flag=picValidation(e.target.files[0].name)
            imageContent(flag)
        }
    };

    function handleAlreadyRegistered() {
        setIsRegistered(true);
    }

    function handlePasswordChange(value) {
        setPassword(value);
        passwordValidation(value);
    }
    function handleUsernameChange(value) {
        setUsername(value);
    }
    function handleConfirmPasswordChange(value) {
        setConfirmPassword(value);
        passwordConfirm(value);
    }
    function handleDisplayNameChange(value) {
        setDisplayName(value)
    }

    //check if the user is valid
    function checkUserValidity(){
        return isConfirm && validPassword && (username !== '') && (displayName !== '') && (validImage);
    }
    function imageContent(x){
        setIsValidImage(x)
        //valid
        if(x){
            setImageClass("btn btn-register input-register-style form-control is-valid")
            setImageCircleClass("user-photo rounded-circle valid-img")
            setImageAlertMessage('')
        //invalid
        }else{
            setImageClass("btn btn-register input-register-style form-control is-invalid")
            setImageCircleClass("user-photo rounded-circle inValid-img")
            setImageAlertMessage('Please upload a valid image')
        }
    }

    async function addUser(newUser){
        try {
            console.log(newUser);
            const response = await fetch('http://localhost:5000/api/Users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                throw new Error('Request failed');
            }
        } catch (error) {
            console.error(error);
        }
    }
    //if the user submits:
    async function handleSubmit(event) {
        event.preventDefault();
        //creating new user
        const newUser = {
            username: username,
            password: password,
            displayName: displayName,
            profilePic: imageSrc
        };
        //if the user is valid he is added to the list
        if (checkUserValidity()) {
            await addUser(newUser);
            setIsValidUser(true)
            //if the user is invalid we alert
        } else {
            setSubmitAlert(true)
            imageContent(validImage && imageSrc !== '')
        }
    }

    //navigating to different pages
    if (isRegistered) {
        return <Navigate to="/" />;
    }
    if (isValidUser) {
        return <Navigate to="/" />;
    }
        return (
            <div className="card border-dark col-lg-12 col-md-10 col-sm-10 col-xs-6" id="register-card">
                <img alt="logo" id="top-register-logo" src={icon}/>
                <form onSubmit={handleSubmit}>
                    <div id="register-box">
                        <p id="missing-information-username">{alertUserName? "Please enter a username":"" }</p>
                        <p id="missing-information-password"> {alertPassword ? "Password is invalid":"" }</p>
                        <p id="missing-information-confirm">{alertConfirm ? "Passwords don't match":"" }</p>
                        <p id="missing-information-display"> {alertDisplay ? "Please enter a display name":"" }</p>
                        <p id="missing-information-Image">{imageAlertMessage}</p>
                        <table className="table-style">
                            <tbody>
                            <InputBar  id={"username"} string={"Username"}  data-toggle="tooltip" title="Enter your display name here" onChange={handleUsernameChange} validPassword={ username !== '' } setAlert={setAlertUserName}  submitAlert={submitAlert} />
                            <InputBar id={"password"} string={"Password"} Hide={true} onChange={handlePasswordChange} validPassword={validPassword} setAlert={setAlertPassword} submitAlert={submitAlert} />
                            <InputBar id={"confirmPassword"} string={"confirm"} Hide={true} onChange={handleConfirmPasswordChange} validPassword={isConfirm} setAlert={setAlertConfirm} submitAlert={submitAlert} />
                            <InputBar id={"displayName"} string={"Display name"} onChange={handleDisplayNameChange} validPassword={ displayName !== '' } setAlert={setAlertDisplay} submitAlert={submitAlert} />
                            </tbody>
                        </table>
                        <table id="pic" className="table-style">
                            <tbody>
                                <tr className="row-style">
                                    <td className="column-style"><label htmlFor="file-input">Picture:</label></td>
                                    <td className="column-style"><input onChange={handleImageChange} className={imageClass}
                                                                        type="file" id="file-input" name="file-input"/></td>
                                    {validImage? <td id="td-img" className="column-style"><img src={imageSrc} alt="User Photo" id="userPhoto-register" className={imageCircleClass}/></td> : ''}
                                </tr>
                            </tbody>
                        </table>
                        <table id="register-button-table">
                            <tbody>
                            <tr>
                                <td><button id="sign-up-btn-register" type="submit" className="btn btn-register btn-outline-dark">SIGN UP</button></td>
                                <td> <p id="log-in-question-register">already registered? click the button</p></td>
                                <td><a id="log-in-btn-register" className="btn btn-register btn-outline-dark" onClick={handleAlreadyRegistered}>LOG IN</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        );

}

export default RegisterPage;

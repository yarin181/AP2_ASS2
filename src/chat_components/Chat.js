import "./chatStyle.css"
import React, {useEffect, useState} from 'react';
import AddContact from "./AddContact";
import {Navigate} from "react-router-dom";
import ContactsSide from "./ContactsSide";
import ChatSide from "./ChatSide";
import {Alert} from "react-bootstrap";



function Chat(props){

    const [logOut, setLogOut] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage,setErrorMessage] = useState('')
    function handleLogOut() {
        props.setIsConnected(false)
        setLogOut(true);
    }


    async function getUsersWithToken() {
        const token= props.token;
        console.log("this is the token: ",token)
        const url = 'http://localhost:5000/api/Chats';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Add the token as an 'Authorization' header
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Users:', data);
            setContactsList(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    const connectUser = {
        username: props.currentUser.username,
        password: props.currentUser.password,
        displayName: props.currentUser.displayName,
        image : props.currentUser.image
    }
    const [contactsList,setContactsList] = useState([]);
    const [currentContact, setContact] = useState('');


    const handleItemClick = (ContactInfo) => {
        setContact(ContactInfo);
        if (ContactInfo.chat > 0){
            let messageContainer = document.getElementById("message-container");
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    };

    const addContact = (newContact) =>{
        setShowAlert(false);


        setContactsList([...contactsList, newContact]);
        setContact(newContact);
    };
    const handleError = (errorMsg) =>{
        setErrorMessage(errorMsg);
        setShowAlert(true);
        setTimeout(() =>setShowAlert(false), 2000);
    }
    const addMessage = (newMsg,name) => {

        const index = contactsList.findIndex(contact => contact.name === name);
        if (index !== -1){
            const updatedContact = {
                ...contactsList[index],
                chat: [...contactsList[index].chat, newMsg]
            };
            const updatedContactsList = [...contactsList];
            updatedContactsList[index] = updatedContact;
            setContactsList(updatedContactsList);
            console.log(updatedContactsList)
        }
    };

    // //init the component
    // useEffect(async () => {
    //
    // }, []);

    // useEffect(async () => {
    //     // Initialization code
    //
    //     setContactsList(await getUsersWithToken());
    //     return () => {
    //     };
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            // Initialization code
            await getUsersWithToken();
            console.log("contacts: ",contactsList)
        };


        // Call the async function immediately
        fetchData().then(r => {});

        return () => {
            // Cleanup code (if needed)
        };
    }, []);

    if (logOut) {
        return <Navigate to="/" />;
    }
    return (
        <>   {showAlert && (
            <Alert variant="danger" id="alert-fade-out" onClose={() => setShowAlert(false)} dismissible>
                {errorMessage}
            </Alert>
        )}
            <div className="card card-chat" id="chat">
                <div className="card-body">
                    <div className="row card-content">
                        <div className="col" id="contacts_area">
                            <ContactsSide user={connectUser} contactsList={contactsList} handleItemClick={handleItemClick} contact={currentContact} handleLogOut={handleLogOut}/>
                        </div>
                        <div className="col">{
                            contactsList.length > 0 ? < ChatSide currentContact={currentContact} addMessage={addMessage} />: ""
                        }
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <AddContact onAdd={addContact} contacts={contactsList} handleError={handleError} />
        </>
    );
}

export default Chat;
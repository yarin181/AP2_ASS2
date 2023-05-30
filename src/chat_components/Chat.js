import "./chatStyle.css"
import React, {useEffect, useState} from 'react';
import AddContact from "./AddContact";
import {Navigate} from "react-router-dom";
import ContactsSide from "./ContactsSide";
import ChatSide from "./ChatSide";
import {Alert} from "react-bootstrap";



function Chat(props){
    const [temp, setTemp]=useState(0)

    const [logOut, setLogOut] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage,setErrorMessage] = useState('')
    const [connectUser,setConnectUser]=useState({})
    // const [users, setUsers]=useState({})
    const [contactsList,setContactsList] = useState([]);
    function handleLogOut() {
        props.setIsConnected(false)
        setLogOut(true);
    }
    //getting the user information
    async function getUser() {
        const token= props.token;
        const url = `http://localhost:5000/api/Users/${props.currentUser.username}`;
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
            //console.log('my data: ', data);
            setConnectUser(data)
        } catch (error) {
            console.error('Error:', error.message);
            handleLogOut()
        }
    }

    //getting the chats of the user
    async function getUsersWithToken() {
        const token= props.token;
        // console.log("this is the token: ",token)
        const url = 'http://localhost:5000/api/Chats';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the token as an 'Authorization' header
                    // 'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Users: ', data);
            setContactsList(data)
        } catch (error) {
            console.error('Error:', error.message);
            handleLogOut()
        }
    }
    async function postContact(newUser){
        const token= props.token;
        try {
            // console.log( JSON.stringify(newUser));
            const response = await fetch('http://localhost:5000/api/Chats', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                const data = await response.json();

                setContact(data)
                console.log("the user data", data);
                return 1
            } else if(response.status === 400){
                handleError("user doesn't exist");
            }else{
                console.error('Request failed');
                handleLogOut()
                return 0
            }
        } catch (error) {
            console.error(error);
            return 0
        }
    }
    async function postMessage(newMsg,id){
        const token= props.token;
        try {
            // console.log(JSON.stringify(newMsg) );
            const response = await fetch(`http://localhost:5000/api/Chats/${id}/Messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMsg)
            });
            if (response.ok) {
                const data = response.json();
                //console.log(data);
                return 1
            } else {
                console.error('Request failed');
                return 0
            }
        } catch (error) {
            console.error(error);
            handleLogOut()
            return 0
        }
    }
    // async function getChat(id) {
    //     const token = props.token;
    //     // console.log("this is the token: ",token)
    //     const url = `http://localhost:5000/api/Chats/${id}`;
    //
    //     try {
    //         const response = await fetch(url, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`, // Add the token as an 'Authorization' header
    //                 // 'Content-Type': 'application/json'
    //             }
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         console.log("new contact: ", data)
    //         console.log("contact list before: ", contactsList)
    //         // setContactsList([...contactsList,data])
    //         // console.log("contact list before: ", contactsList)
    //
    //     } catch (error) {
    //         console.error('Error:', error.message);
    //     }
    // }



    // const connectUser = {
    //     username: props.currentUser.username,
    //     password: props.currentUser.password,
    //     displayName: props.currentUser.displayName,
    //     profilePic : props.currentUser.image
    // }

    const [currentContact, setContact] = useState('');


    const handleItemClick = (ContactInfo) => {
        setContact(ContactInfo);
        // if (ContactInfo > 0){
        //     let messageContainer = document.getElementById("message-container");
        //     messageContainer.scrollTop = messageContainer.scrollHeight;
        // }
    };

      const addContact = async (newContact) => {
          setShowAlert(false);
          const validChat = await postContact(newContact);
          if (validChat) {
              await getUsersWithToken();
          }
          // setContactsList([...contactsList, newContact]);
      };
    const handleError = (errorMsg) =>{
        setErrorMessage(errorMsg);
        setShowAlert(true);
        setTimeout(() =>setShowAlert(false), 3000);
    }
    const addMessage = async (newMsg, id) => {
        const msgJson= {msg:newMsg}
        // console.log(newMsg)
        // console.log(id)
        await postMessage( msgJson, id)
        await getUsersWithToken();
        setTemp(temp+1)


        // const index = contactsList.findIndex(contact => contact.name === name);
        // if (index !== -1){
        //     const updatedContact = {
        //         ...contactsList[index],
        //         chat: [...contactsList[index].chat, newMsg]
        //     };
        //     const updatedContactsList = [...contactsList];
        //     updatedContactsList[index] = updatedContact;
        //     setContactsList(updatedContactsList);
        //     console.log(updatedContactsList)
        // }
    };

    useEffect(() => {
        const fetchData = async () => {
            // Initialization code
            await getUsersWithToken();
            await getUser();
            console.log("user token - ",props.token)
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
                            <ContactsSide user={connectUser} contactsList={contactsList} handleItemClick={handleItemClick} contact={currentContact} handleLogOut={handleLogOut} temp={temp}/>
                        </div>
                        <div className="col">{
                            currentContact  ? < ChatSide token = {props.token} currentContact={currentContact} addMessage={addMessage} temp={temp}/>: ""
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
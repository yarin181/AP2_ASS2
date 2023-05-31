import Message from "./Message"

import React, {useEffect, useState} from "react";
function MessageWindow (props){
    const [messageContent, setMessageContent] = useState('');
    const [messages,setMessages]=useState({})


    // const [currentChat, setCurrentChat] = useState()

    const handleSendMessage = () => {
        if (messageContent.length === 0){
            return;
        }
        // console.log("user :",props.contact)
        // console.log("user id:",props.contact.id)
        // const time =Date.now();
        // const timeObj = new Date(time);
        // const formattedDate = timeObj.toLocaleDateString('en-GB').toString();
        // const hours = timeObj.getHours();
        // const minutes = timeObj.getMinutes();
        // const formatTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        // const newMsg = {sender: true, content: messageContent,time: formatTime,date: formattedDate};
        props.addMessage(messageContent,props.contact.id);
        // getMessages()
        // contact.chat.push(newMsg)
        setMessageContent('');
    };
    async function  getMessages() {
        const token= props.token;
        const url = `http://localhost:5000/api/Chats/${props.contact.id}/Messages`;
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
            setMessages(data)
        } catch (error) {
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            // Initialization code
            await getMessages()

        };
        // Call the async function immediately
        fetchData().then(r => {});

        return () => {
            // Cleanup code (if needed)
        };
    }, [props.contact,props.temp]);

    return (
        <>
        <div className="container" >
            <div className="row" id="message_placeholder">
                <div className="col col-md-12" id="message_container">
                    <div id="message-window">
                        {props.contact !== null ? messages.length > 0 ? messages.slice().reverse().map((message, index) => (
                            <Message key={index}  msg={message} sender={message.sender.username === props.contact.user.username }/>
                        )): "" : ""}
                    </div>
                </div>
            </div>
        </div>
        <div className="input-group mb-3" id="chat-insert-box">
            <input type="text" className="form-control" id="inputField" placeholder="Enter your message here..." value={messageContent} onChange={
                (event) => setMessageContent(event.target.value)}/>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2"  onClick={handleSendMessage} >Send</button>
        </div>
        </>
    );
}
export default MessageWindow;

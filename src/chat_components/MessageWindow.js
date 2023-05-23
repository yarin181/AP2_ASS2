import Message from "./Message"

import React, {useState} from "react";
function MessageWindow (args){
    const {contact} = args;
    const [messageContent, setMessageContent] = useState('');

    const handleSendMessage = () => {
        if (messageContent.length === 0){
            return;
        }
        const time =Date.now();
        const timeObj = new Date(time);
        const formattedDate = timeObj.toLocaleDateString('en-GB').toString();
        const hours = timeObj.getHours();
        const minutes = timeObj.getMinutes();
        const formatTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const newMsg = {sender: true, content: messageContent,time: formatTime,date: formattedDate};
        args.addMessage(newMsg,contact.name);
        contact.chat.push(newMsg)
        setMessageContent('');

    };
    return (
        <>
        <div className="container" >
            <div className="row" id="message_placeholder">
                <div className="col col-md-12" id="message_container">
                    <div id="message-window">
                        {contact !== '' ? 0 > 0 ? contact.chat.map((message, index) => (
                            <Message key={index}  msg={message}/>
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

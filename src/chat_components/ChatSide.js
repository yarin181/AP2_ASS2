
import img from "../photos/robo2.jpg";
import MessageWindow from "./MessageWindow";
import React from "react";


function ChatSide({currentContact,addMessage,token}){
    return(
        <>
            <div className="row" id="chat-bar">
                <div className="col col-2">
                    <div className="container">
                        <img src={currentContact.user.profilePic} className="  rounded-circle img-fluid" alt="Placeholder Image Avatar" width={60} height={60}/>
                    </div>
                </div>
                <div id="connectName" className="col col-8">
                    {currentContact.user.displayName}
                </div>

        </div>
            <br />
            <MessageWindow token={token} id="msgWindow" contact={currentContact} addMessage={addMessage} />
        </>

    );
}
export default ChatSide;
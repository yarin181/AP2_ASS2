
import img from "../photos/robo2.jpg";
import robo5 from "../photos/robo5.jpg";
import MessageWindow from "./MessageWindow";
import React from "react";


function ChatSide({currentContact,addMessage,token}){
    return(
        <>
            <div className="row" id="chat-bar">
                <div className="col col-2">
                    <div className="container">
                        <img src={robo5} className="  rounded-circle img-fluid" alt="Placeholder Image Avatar" width={60} height={60}/>
                    </div>
                </div>
                <div id="connectName" className="col col-8">
                    {currentContact.user.username}
                </div>

        </div>
            <br />
            <MessageWindow token={token} id="msgWindow" contact={currentContact} addMessage={addMessage} />
        </>

    );
}
export default ChatSide;
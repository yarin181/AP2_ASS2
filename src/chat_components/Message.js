
function Message({msg,index,sender}) {
    const className =  sender ? "message sent" : "message received";
    return (
        <div className={className} id={index}>
            <p className="message-text">{msg.content}</p>
            <p className="time-stamp">{msg.created}</p>
        </div>
    );
}

export default Message;
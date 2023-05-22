
function Message({msg,index}) {
    const className = msg.sender ? "message sent" : "message received";
    return (
        <div className={className} id={index}>
            <p className="message-text">{msg.content}</p>
            <p className="time-stamp">{msg.time}</p>
        </div>
    );
}

export default Message;
import LastMessageDetails from "./LastMessageDate";
function UserBar(props){
    // const {userInfo} = props;
    const handleClick = () => {
        props.onItemClick(props.userInfo);
    };

    console.log("user name : ",props.userInfo.user.displayName);
    return(
         <a className={props.contact.id === props.userInfo.id ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action" } aria-current="true" onClick={handleClick}>
        <div className="grid-container user-bar">
            <div className="grid-item item1">
                <img src={props.userInfo.user.profilePic} alt="User Photo" className="rounded-circle user-photo"/>
            </div>
            <div className="grid-item item2">
                <div className="nickname1">{props.userInfo.user.displayName}
                    <p className="small-message"> {
                         (props.userInfo.lastMessage) ?(
                             (props.userInfo.lastMessage.content > 25) ?
                                 (props.userInfo.lastMessage.content.substring(0, 25) + "..." ):
                                 (props.userInfo.lastMessage.content)) : ""} </p>
                </div>

            </div>
            <LastMessageDetails userInfo={props.userInfo} />
        </div>
    </a>

    );
}

export default UserBar;
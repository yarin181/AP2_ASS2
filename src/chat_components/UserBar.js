import robo5 from "../photos/robo5.jpg";
function UserBar(props){
    // const {userInfo} = props;
    const handleClick = () => {
        props.onItemClick(props.userInfo.user);
    };
    console.log("user name : ",props.userInfo.user.displayName);
    return(
         <a className={props.contact.username === props.userInfo.user.username ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action" } aria-current="true" onClick={handleClick}>
        <div className="grid-container user-bar">
            <div className="grid-item item1">
                <img src={robo5} alt="User Photo" className="rounded-circle user-photo"/>
            </div>
            <div className="grid-item item2">
                <div className="nickname1">{props.userInfo.user.username}
                    {/*<p className="small-message"> {userInfo.chat.length > 0 ?*/}
                    {/*    (userInfo.chat[userInfo.chat.length-1].content.length > 25 ?*/}
                    {/*        userInfo.chat[userInfo.chat.length-1].content.substring(0, 25) + "..." :*/}
                    {/*        userInfo.chat[userInfo.chat.length-1].content) :*/}
                    {/*    ""}</p>*/}
                </div>

            </div>
            {/*<div className="grid-item item3">*/}
            {/*    {userInfo.chat.length > 0 ? userInfo.chat[userInfo.chat.length-1].date: "" }<p className="small-message">*/}
            {/*    {userInfo.chat.length > 0 ? userInfo.chat[userInfo.chat.length-1].time: "" }</p>*/}
            {/*</div>*/}
        </div>
    </a>

    );
}

export default UserBar;
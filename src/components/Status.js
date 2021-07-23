import React from "react";

function Status(props) {
    return(
        <div className="statusBox">
            {
                props.comment
                ?
                <p>{props.comment} commented on your post</p>
                :
                <p>{props.like} liked your post</p>
            }
        </div>
    );
}

export default Status;
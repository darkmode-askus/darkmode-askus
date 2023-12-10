import React from "react";

const CommentView = ({comment}) => {
    return (
        <div className={"ps-5"}>
            <p><strong>{comment.source}</strong>: {comment.comment}</p>
        </div>
    )
}

export default CommentView;
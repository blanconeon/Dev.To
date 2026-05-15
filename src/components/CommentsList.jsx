import React from "react";



export const CommentList = ({comment}) => {




    return (
<>
<div dangerouslySetInnerHTML={{ __html: comment.body_html }} />
</>
    )
}
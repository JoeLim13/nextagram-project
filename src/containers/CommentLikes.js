import React, { useState } from 'react';
import axios from 'axios';

const CommentLikes = ({ comId, setSubmitted }) => {
    const [liked, setLiked] = useState(false)

    const handleCommentLike = () => {
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/comments/${comId}/toggle_like`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(result => {
                console.log(result)
                setLiked(result.data.liked)
                setSubmitted(true)
            })
            .catch(err => {
                console.log(err)
            })
        setSubmitted(false)
    }


    return (
        <>
            {
                liked ? <span onClick={handleCommentLike} className="text-danger">Unlike</span> : <span onClick={handleCommentLike} className="primary">Like</span>
            }
        </>
    )
}
export default CommentLikes;
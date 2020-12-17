import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroupItem } from 'reactstrap';


const Likes = ({ imageId }) => {

    const [liked, setLiked] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [likeUsers, setLikeUsers] = useState([])

    const handleImageLike = (e) => {
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/images/${imageId}/toggle_like`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(result => {
                console.log(result)
                setSubmitted(true)
            })
            .catch(err => {
                console.log(err)
            })
        setSubmitted(false)
    }

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v2/images/${imageId}`,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            .then(result => {
                setLiked(result.data.liked)
                setLikeUsers(result.data.likes)
            })
            .catch(error => {
                console.log(error)
            })

    }, [imageId, submitted])
    return (
        <ListGroupItem>
            {
                liked ? <span onClick={handleImageLike} className="text-danger">Unlike</span> : <span onClick={handleImageLike} className="primary">Like</span>
            }
            {''} {likeUsers.length} likes
        </ListGroupItem>
    )
}

export default Likes;
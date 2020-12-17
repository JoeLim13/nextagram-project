import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroupItem, Form, Input } from 'reactstrap';
import CommentLikes from '../containers/CommentLikes';


const Comments = ({ imageId }) => {
    const [comments, setComments] = useState([])
    const [input, setInput] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const handleComment = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            data: {
                content: input
            }
        })
            .then(result => {
                console.log(result)
                setInput("")
                setSubmitted(true)
            })
            .catch(err => {
                console.log(err)
            })
        setSubmitted(false)

    }
    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            .then(result => {
                setComments(result.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, [imageId, submitted])

    return (
        <>
            {
                comments.map(com => {
                    return (
                        <ListGroupItem key={com.id}>
                            <div>
                                <img src={com.posted_by.profileImage} className="rounded-circle" width="30" height="30" />
                            </div>
                            <div>
                                <span>{com.content}</span>{''} <CommentLikes comId={com.id} setSubmitted={setSubmitted} />
                            </div>
                        </ListGroupItem>
                    )
                })
            }
            <ListGroupItem>
                <Form onSubmit={handleComment}>
                    <Input value={input} onChange={handleInput} />
                </Form>
            </ListGroupItem>
        </>

    )
}

export default Comments
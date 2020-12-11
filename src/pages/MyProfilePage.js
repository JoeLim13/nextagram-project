import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserImages from '../containers/UserImages'
import LoadingIndicator from '../components/LoadingIndicator'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const MyProfilePage = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get("https://insta.nextacademy.com/api/v1/users/me",
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            .then(result => {
                console.log(result)
                setUser(result.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])

    return (
        <div>
            <h1>{user.username}</h1>
            { user.id
                ? (<>
                    <img src={user.profile_picture} className="rounded-circle" width="200" alt="profilepic" />
                    <h2>Uploaded Images</h2>
                    <UserImages userId={user.id} />
                </>)
                : <LoadingIndicator />
            }
            <Link to={`/profile/me`}>
                <Button>Upload</Button>
            </Link>
        </div>
    )
}
export default MyProfilePage
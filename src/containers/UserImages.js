import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator'
import Comments from '../containers/Comments'
import Likes from '../containers/Likes'
import { useLocation } from 'react-router-dom'

const UserImages = ({ userId }) => {

  const [userImages, setUserImages] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const location = useLocation()



  useEffect(() => {
    //perform a GET request
    axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
      .then(result => {
        // If successful, we do stuffs with 'result'
        setUserImages(result.data)
        setIsLoading(false)

      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
      })
  }, [userId])


  if (isloading) {
    return <LoadingIndicator width="100px" height="100px" color="blue" />
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {userImages.map((eachImg) => {

        if (location.pathname === "/") {
          return (
            <div key={eachImg.id} style={{ width: "200px" }}>
              <img src={eachImg.url} alt="User Images" style={{ width: "150px", height: "100px", marginBottom: '20px' }} />
            </div>
          )
        } else {
          return (
            <div key={eachImg.id} style={{ width: "200px", margin: '20px' }}>
              <img src={eachImg.url} alt="User Images" style={{ width: "200px", height: "200px", marginBottom: '20px' }} />
              <Likes imageId={eachImg.id} />
              <Comments imageId={eachImg.id} />
            </div>
          )
        }
      })}
    </div >
  )
}
export default UserImages;
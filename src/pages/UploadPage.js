import React, { useState } from 'react';
import { Button, Form, FormGroup, FormText, Input } from "reactstrap"
import axios from 'axios'

const UploadPage = () => {
    const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')

    const handleImageFile = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0])
    }

    const handleSubmitFile = (e) => {
        // Prevent the default behaviour of the form submitting
        e.preventDefault();
        // Authorization of the user
        let JWT = localStorage.getItem("jwt");
        // Formdata object to hold the image file to send to the server
        let formData = new FormData();
        // Append the key:value pair to the formData object
        formData.append("image", imageFile);

        axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
            headers: { Authorization: `Bearer ${JWT}` }
        })
            .then(response => {
                if (response.data.success) {
                    setMessage("Image Uploaded Successfully!")
                    setPreviewImage(null)
                    setImageFile(null)
                }
            })
            .catch(error => {
                console.log(error.response);
            });
    };
    return (
        <> <div>
            <div style={{ margin: 'auto', border: '10px solid blue', padding: '20px', width: '500px', height: '500px', boxSizing: 'border-box' }}>
                {previewImage ? (
                    <img
                        src={previewImage}
                        width="100%"
                        height="100%"
                    />
                ) : (
                        <h3 className="text-center" style={{ paddingTop: '40%' }}>
                            {message ? message : "Live Preview"}
                        </h3>
                    )}
            </div>
            <Form>
                <FormGroup>
                    <Input
                        type="file"
                        name="image-file"
                        multiple="multiple"
                        onChange={handleImageFile}
                    />
                    <FormText color="muted">
                        Make sure the image being uploaded is a supported format.
              </FormText>
                </FormGroup>
                <Button onClick={handleSubmitFile} type="submit" color="primary">
                    Upload
            </Button>
            </Form>
        </div>
        </>
    )
}

export default UploadPage;
import React, { useState } from "react"
import { ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap"
import axios from "axios"
import { toast } from "react-toastify"

const SignUpForm = ({ toggleIsLogin, toggle }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");

    //Username Setup
    const handleSubmit = () => {
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: username,
                email: email,
                password: password
            }
        })
            .then(response => {
                console.log(response)
                toast(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {

                error.response.data.message.forEach((message) => {
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })

                console.error(error.response) // so that we know what went wrong if the request failed
            })
    }

    const checkUsername = newUsername => {
        // this should only trigger after you stop typing for 500ms
        console.log("Making API call to check username!");
        axios
            .get(
                `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
            )
            .then(response => {
                console.log(response.data);
                if (response.data.valid) {
                    setUsernameValid(true);
                } else {
                    setUsernameValid(false);
                }
            });
    };

    const handleUsernameInput = e => {
        // clears queue so that the old keystrokes don't trigger axios call
        clearTimeout(delay);
        const newUsername = e.target.value;
        setUsername(newUsername);

        // put each new keystroke into the queue
        const newDelay = setTimeout(() => {
            checkUsername(newUsername);
        }, 500);

        setDelay(newDelay);
    };

    const getInputProp = () => {
        if (!username.length) {
            return null;
        }

        if (username.length <= 6) {
            return { invalid: true };
        }

        if (usernameValid) {
            return { valid: true };
        } else {
            return { invalid: true };
        }
    };

    const getFormFeedback = () => {
        if (!username.length) {
            return null;
        }

        if (username.length <= 6) {
            return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
        }

        if (usernameValid) {
            return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
        } else {
            return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
        }
    };

    //Password Setup
    const getPasswordProp = () => {
        if (!password.length) {
            return null;
        }

        if (password.length <= 6) {
            return { invalid: true };
        } else {
            return { valid: true };
        }
    }
    const getFormPasswordFeedback = () => {
        if (!password.length) {
            return null;
        }

        if (password.length <= 6) {
            return <FormFeedback invalid>Password is too short</FormFeedback>;
        } else {
            return <FormFeedback valid>Password is strong</FormFeedback>;
        }
    };
    //Confirm Password Setup
    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }
    const getConfirmPasswordProp = () => {
        if (!confirmPassword.length) {
            return null;
        }

        if (confirmPassword === password) {
            return { valid: true };
        } else {
            return { invalid: true };
        }
    }
    const getFormConfirmPasswordFeedback = () => {
        if (!confirmPassword.length) {
            return null;
        }

        if (confirmPassword === password) {
            return <FormFeedback valid>Password is correct</FormFeedback>;
        } else {
            return <FormFeedback invalid>Password does not match</FormFeedback>;
        }
    };
    // Email Setup
    const getEmailProp = () => {
        if (!email.length) {
            return null;
        }
        if (!email.includes("@")) {
            return { invalid: true };
        } else {
            return { valid: true };
        }
    }

    const getEmailFeedback = () => {
        if (!email.length) {
            return null;
        }

        if (!email.includes("@")) {
            return <FormFeedback invalid>Email is invalid</FormFeedback>;
        } else {
            return <FormFeedback valid>Correct Email</FormFeedback>;
        }
    };



    return <>
        <Form>
            <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="username" name="username" id="username" placeholder="Key in username" value={username} onChange={(e) => { setUsername(e.target.value) }} onChange={handleUsernameInput} {...getInputProp()} />
                    {getFormFeedback()}
                    <FormText>Enter a username between 6 and 20 characters</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Key in email" value={email} onChange={(e) => { setEmail(e.target.value) }} {...getEmailProp()} />
                    {getEmailFeedback()}
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Key in password" value={password} onChange={(e) => { setPassword(e.target.value) }} {...getPasswordProp()} />{getFormPasswordFeedback()}
                    <FormText>Enter a password of at least 6 characters long </FormText>
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" value={confirmPassword} onChange={confirmPasswordHandler} {...getConfirmPasswordProp()} />{getFormConfirmPasswordFeedback()}
                </FormGroup>
                <p>Already a member? <a href="#" onClick={(e) => {
                    e.preventDefault()
                    toggleIsLogin()
                }}>Log in here</a></p>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    disabled={!(username && email && password)}
                    onClick={handleSubmit}>Sign Up</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Form>
    </>
}

export default SignUpForm
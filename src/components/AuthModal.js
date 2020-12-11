import React, { useState } from 'react'
import { Modal } from "reactstrap"
import LoginForm from './LoginForm'
import SignUpForm from '../components/SignUpForm'


const AuthModal = ({ isOpen, toggle, setLoggedIn }) => {
    const [isLogin, setIsLogin] = useState(true)
    const toggleIsLogin = () => {
        setIsLogin(!isLogin)
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} >
            {
                isLogin
                    ? <LoginForm toggle={toggle} toggleIsLogin={toggleIsLogin} setLoggedIn={setLoggedIn} />
                    : <SignUpForm toggle={toggle} toggleIsLogin={toggleIsLogin} setLoggedIn={setLoggedIn} />
            }
        </Modal>
    )
}

export default AuthModal
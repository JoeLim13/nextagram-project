import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { useHistory } from 'react-router-dom'
import AuthModal from '../components/AuthModal'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

const NavBarDisplay = ({ loggedIn, setLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal)

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
        toast.success('Logged Out', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        history.push("/")

    }

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand style={{ cursor: "pointer" }} onClick={() => { history.push("/") }}>Nextagram</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink style={{ cursor: "pointer" }} onClick={() => { history.push("/") }}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            {
                                loggedIn ?
                                    <NavLink style={{ cursor: "pointer" }} onClick={() => handleLogout()}>Log Out</NavLink>
                                    :
                                    <NavLink style={{ cursor: "pointer" }} onClick={toggleModal}>Login</NavLink>
                            }
                        </NavItem>
                        <NavItem>
                            {
                                loggedIn ?
                                    <Link to="/profile"><NavLink style={{ cursor: "pointer" }}>My Profile</NavLink></Link>
                                    :
                                    null
                            }
                        </NavItem>

                    </Nav>
                </Collapse>
            </Navbar>
            <AuthModal isOpen={showModal} toggle={toggleModal} setLoggedIn={setLoggedIn} />
        </div>
    );

}

export default NavBarDisplay
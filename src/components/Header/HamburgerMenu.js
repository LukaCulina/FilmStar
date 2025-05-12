import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from "../../context/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import "./Header.css";
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const HamburgerMenu = ({
    activeButton,
    handleButtonClick,
    handleLogout
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user, logout } = UserAuth();
   
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        bgcolor: '#0c0c0c',
        border: '2px solid #000',
        boxShadow: 24,
        color:'white',
      };
    return (
        <>
           <span className="hamburger_icon" onClick={handleOpen}>
                <MenuIcon fontSize='large'></MenuIcon>
            </span>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Box sx={style}>
                    <p className='close' onClick={handleClose}>
                        <CloseIcon fontSize='large'></CloseIcon>
                    </p>
                        <div className="hamburger_navbar">
                            <Link to='/trending'>
                                <button className={`nav_button hamburger ${activeButton === 2 ? 'active' : ''}`}
                                    onClick={() => {
                                        handleButtonClick(2);
                                        handleClose();
                                    }}>
                                    Trending
                                </button>
                            </Link>
                            <Link to='/movies'>
                                <button className={`nav_button hamburger ${activeButton === 3 ? 'active' : ''}`}
                                    onClick={() => {
                                        handleButtonClick(3);
                                        handleClose();
                                    }}>
                                    Movies
                                </button>
                            </Link>
                            <Link to='/series'>
                                <button className={`nav_button hamburger ${activeButton === 4 ? 'active' : ''}`}
                                    onClick={() => {
                                        handleButtonClick(4);
                                        handleClose();
                                    }}>
                                    Series
                                </button>
                            </Link>
                        </div>
                        {user?.email ? (
                            <div className="hamburger_buttons">
                                <Link to='/account' onClick={() => handleButtonClick(5)}>
                                    <button className={`auth_button hamburger ${activeButton === 5 ? 'active' : ''}`}
                                        onClick={() => {
                                            handleClose();
                                        }}>
                                        Account
                                    </button>
                                </Link>
                                <button className='auth_button hamburger logout'
                                    onClick={() => {
                                        handleButtonClick(1);
                                        handleLogout();
                                        handleClose();
                                    }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="hamburger_buttons">
                                <Link to='/login' onClick={() => handleButtonClick(5)}>
                                    <button className={`auth_button hamburger ${activeButton === 5 ? 'active' : ''}`}
                                         onClick={() => {
                                            handleClose();
                                        }}>
                                        Login
                                    </button>
                                </Link>
                                <Link to='/signup' onClick={() => handleButtonClick(6)}>
                                    <button className={`auth_button hamburger ${activeButton === 6 ? 'active' : ''}`}
                                        onClick={() => {
                                            handleClose();
                                        }}>
                                        Signup
                                    </button>
                                </Link>
                            </div>
                        )}
                    </Box>
                </Modal>
            </>
    )
}

export default HamburgerMenu;
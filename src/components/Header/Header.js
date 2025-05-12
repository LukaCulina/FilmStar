import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from "../../context/AuthContext";
import "./Header.css";
import HamburgerMenu from './HamburgerMenu';

const Header = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    };
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    return (
        <span onClick={()=> window.scroll(0,0)} className='header'>
            <span className="header_title">
                <Link to='/' onClick={() => handleButtonClick(1)}>
                    FilmStar
                </Link>
            </span>
            <div className="navbar">
                <Link to='/trending'>
                    <button className={`nav_button ${activeButton === 2 ? 'active' : ''}`}
                        onClick={() => handleButtonClick(2)}>
                        Trending
                    </button>
                </Link>
                <Link to='/movies'>
                    <button className={`nav_button ${activeButton === 3 ? 'active' : ''}`}
                        onClick={() => handleButtonClick(3)}>
                        Movies
                    </button>
                </Link>
                <Link to='/series'>
                    <button className={`nav_button ${activeButton === 4 ? 'active' : ''}`}
                        onClick={() => handleButtonClick(4)}>
                        Series
                    </button>
                </Link>
            </div>
            {user?.email ? (
                <div className="buttons">
                    <Link to='/account' onClick={() => handleButtonClick(5)}>
                        <button className={`auth_button ${activeButton === 5 ? 'active' : ''}`}>Account</button>
                    </Link>
                    <button className='auth_button'
                        onClick={() => {
                            handleButtonClick(1);
                            handleLogout();
                        }}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className="buttons">
                    <Link to='/login' onClick={() => handleButtonClick(5)}>
                        <button className={`auth_button ${activeButton === 5 ? 'active' : ''}`}>
                            Login
                        </button>
                    </Link>
                    <Link to='/signup' onClick={() => handleButtonClick(6)}>
                        <button className={`auth_button ${activeButton === 6 ? 'active' : ''}`}>
                            Signup
                        </button>
                    </Link>
                </div>
            )}
            <HamburgerMenu
                activeButton={activeButton}
                handleButtonClick={handleButtonClick}
                handleLogout={handleLogout}
            >

            </HamburgerMenu>
        </span>
    )
}

export default Header;
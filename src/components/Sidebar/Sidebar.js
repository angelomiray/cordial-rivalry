import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(localStorage.getItem('selectedItem') || 'overview-item');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname;
        let newActiveLink = 'overview-item';

        if (path === '/rooms') {
            newActiveLink = 'rooms-item';
        } else if (path === '/settings') {
            newActiveLink = 'settings-item';
        } else if (path === '/dashboard') {
            newActiveLink = 'overview-item';
        }

        setActiveLink(newActiveLink);
        localStorage.setItem('selectedItem', newActiveLink);
    }, [location]);

    const handleSignout = () => {
        localStorage.setItem('selectedItem', 'overview-item');
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const handleNavigation = (path, linkId) => {
        setActiveLink(linkId);
        localStorage.setItem('selectedItem', linkId);
        navigate(path);
    };

    return (
        <nav id="account-options" className="col-xl-2 col-0 navbar navbar-expand-xl navbar-light">
            <button className="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav flex-column">
                    <li className="nav-item logo">
                        <Link to="/" onClick={() => handleNavigation('/', 'overview-item')}>
                            {/* <img src="src/img/logo.png" alt="Logo"/> */}
                            <span className="text-light">RIVALRY</span>
                        </Link>
                    </li>

                    <li className={`nav-item ${activeLink === 'overview-item' ? 'selected' : ''}`} id="overview-item">
                        <Link className="nav-link" to="/dashboard" onClick={() => handleNavigation('/dashboard', 'overview-item')}>
                            <div className="option">
                                <i className="fas fa-chart-line"></i>
                                <span>Overview</span>
                            </div>
                        </Link>
                    </li>
                    <li className={`nav-item ${activeLink === 'rooms-item' ? 'selected' : ''}`} id="rooms-item">
                        <Link className="nav-link" to="/rooms" onClick={() => handleNavigation('/rooms', 'rooms-item')}>
                            <div className="option">
                                <i className="fa-solid fa-dice-six"></i>
                                <span>Rooms</span>
                            </div>
                        </Link>
                    </li>
                    <li className={`nav-item ${activeLink === 'bets-item' ? 'selected' : ''}`} id="bets-item">
                        <Link className="nav-link" to="/userBetsDashboard" onClick={() => handleNavigation('/userBetsDashboard', 'bets-item')}>
                            <div className="option">
                                <i className="fa-solid fa-money-bill"></i>
                                <span>Bets</span>
                            </div>
                        </Link>
                    </li>
                    <li className={`nav-item ${activeLink === 'settings-item' ? 'selected' : ''}`} id="settings-item">
                        <Link className="nav-link" to="/profile" onClick={() => handleNavigation('/settings', 'settings-item')}>
                            <div className="option">
                                <i className="fa-solid fa-gear"></i>
                                <span>Settings</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item" id="signout-item">
                        <a className="nav-link" href="#" onClick={handleSignout}>
                            <div className="option">
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Sign out</span>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <hr />
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <div className="option">
                                <i className="fa-solid fa-message"></i>
                                <span className="option-text">Messages</span>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <div className="option">
                                <i className="fa-solid fa-bell"></i>
                                <span className="option-text">Notifications</span>
                                <i style={{ fontSize: '14px' }} className="fa-solid fa-3 notify-info"></i>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <div className="option">
                                <i className="fa-brands fa-rocketchat"></i>
                                <span className="option-text">Comments</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;

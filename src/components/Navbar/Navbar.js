import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent p-4">
            <div className="logo">
                <img src="https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png" alt="Logotipo" />
            </div>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Products</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Resources</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Support</a>
                    </li>
                </ul>
                <div id="login" className="ml-auto d-flex align-items-center">
                    {currentUser ? (
                        <div className="logged-in-info text-center">
                            <span className="text-light mr-4">Welcome, {currentUser.fname}</span>
                            <Link to="/dashboard" className="nav-link link">Go to your Bets Dashboard</Link>                            
                        </div>
                    ) : (
                        <div className="login">
                            <Link to="/signin" className="nav-link text-light mr-4">Login</Link>
                            <Link to="/signup" className="nav-link emp-btn text-light">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

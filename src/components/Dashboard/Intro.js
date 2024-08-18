import React from 'react';
import './Intro.css';


function Intro(props) {
    return (
        <div id="intro" className="d-flex flex-column flex-md-row align-items-center justify-content-between mt-5 mb-3">
            <div id="right-intro" className="order-md-2 d-none d-md-flex">
                <h3 id="user-name" className="mr-4" style={{ lineHeight: '50px', color: 'white' }}>
                    {props.introText}
                </h3>
                <div id="profile-pic">
                    <img src={props.imgUrl} alt="Profile" />
                </div>
            </div>
            <h1 className="text-light">{props.title}</h1>
        </div>
    );
}

export default Intro;

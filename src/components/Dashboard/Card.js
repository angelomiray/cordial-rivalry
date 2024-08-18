import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

function Card() {
    return (
        <div className="card mb-3 bg-img" style={{ backgroundColor: 'black' }}>
            <div className="row no-gutters h-100 justify-content-between">
                <div className="col-lg-12 col-md-12 col-sm-12 h-100 p-lg-3 p-sm-0">
                    <div className="card-body text-light d-flex flex-column justify-content-between h-100">
                        <div className="mb-lg-2 mb-sm-4">
                            <h4 className="card-title text-light display-4">Bet Room Creation</h4>
                            <h6 className="card-text" style={{ color: 'grey' }}>
                                Create a room, define bet options and invite comrades
                            </h6>
                        </div>
                        <Link to="../../createRoom" className="btn btn-danger mt-5 py-3">Create Room</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;

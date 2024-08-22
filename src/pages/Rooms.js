import React, { useState, useEffect } from 'react';
import Background from "../components/Background";
import Sidebar from "../components/Sidebar/Sidebar";
import Intro from '../components/Dashboard/Intro';
import { getRooms } from '../services/room'; // Import the getRooms function
import './Rooms.css'; // Import custom CSS file
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsData = await getRooms();
                // Transform the rooms object into an array
                const roomsArray = Object.keys(roomsData || {}).map(key => ({ id: key, ...roomsData[key] }));
                setRooms(roomsArray);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    // Filter rooms based on the search query
    const filteredRooms = rooms.filter(room =>
        room.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Background />
            <div className="content container-fluid">
                <div id="container" className="row">
                    <Sidebar />

                    <div id="dashboard" className="col-xl-9 col-lg-12 col-12">
                        <Intro
                            introText="Your Rooms"
                            imgUrl={currentUser.imgUrl}
                            title=''
                        />

                        <div id="content" className="m-auto col-12">
                            <div className="search d-flex justify-content-between">
                                <div className="input-container col-lg-10 col-11">
                                    <i className="fas fa-search"></i>
                                    <input
                                        id="search-input"
                                        type="text"
                                        placeholder="Type the room name here"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Dropdown className="col-lg-2">
                                    <Dropdown.Toggle
                                        id="dropdown-custom-components"
                                        className="btn dropdown-toggle dropdown-toggle-no-arrow"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                    >
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#">Sort by Date</Dropdown.Item>
                                        <Dropdown.Item href="#">Sort by Title</Dropdown.Item>
                                        <Dropdown.Item href="#">Join with a Code</Dropdown.Item>
                                        <Dropdown.Item href="/create-room">Create a new Room</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div id="roomsList" className="d-flex col-12 flex-wrap">
                                {filteredRooms.length > 0 ? (
                                    filteredRooms.map((room) => (
                                        <div
                                            key={room.id}
                                            className="room-card col-xl-3 col-lg-4 col-sm-5 p-0 mr-2 mb-2"
                                            onClick={() => navigate("/RoomDetails", { state: { room } })}
                                        >
                                            <div className="card-img-container">
                                                <img className="card-img-top" src={room.imgUrl} alt={room.title} />
                                            </div>
                                            <div className="card-body">
                                                <h3 className="text-truncate">{room.title}</h3>
                                                <h4 className="text-truncate" style={{ color: 'wheat' }}>{room.subtitle}</h4>
                                                <div className="card-date">
                                                    <i className="far fa-calendar-alt mr-2"></i>
                                                    {'May 15'}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No rooms available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rooms;

import React, { useEffect, useState } from 'react';
import Background from "../components/Background";
import Card from "../components/Dashboard/Card";
import Intro from "../components/Dashboard/Intro";
import Sidebar from "../components/Sidebar/Sidebar";
import { getRooms } from '../services/room';
import './Dashboard.css';
import BetItem from '../components/Dashboard/BetItem';
import BetItemResume from '../components/Dashboard/BetItemResume';

function Dashboard() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        loadRooms();
    }, []);

    useEffect(() => {
        if (rooms.length > 0) {
            setSelectedRoom(rooms[0]);
        }
    }, [rooms]);

    const loadRooms = async () => {
        if (!currentUser || !currentUser.id) {
            console.error('No current user found in localStorage');
            return;
        }

        try {
            const roomsData = await getRooms();
            const roomsList = Object.entries(roomsData).map(([id, room]) => ({ id, ...room }));
            setRooms(roomsList);
        } catch (error) {
            console.error('Error loading rooms:', error);
        }
    };

    const filterRooms = (query) => {
        const filteredRooms = rooms.filter(room => room.title.toLowerCase().includes(query.toLowerCase()));
        setRooms(filteredRooms);
    };

    return (
        <>
            <Background />
            <div className="content container-fluid">
                <div id="container" className="row">
                    <Sidebar />
                    <div id="dashboard" className="col-xl-9 col-lg-12 col-12">
                        <Intro title="Overview" introText={currentUser?.fname} imgUrl={currentUser?.imgUrl} />
                        <Card />
                        <div id="bets-card" className="row d-flex flex-sm-row flex-column">
                            <div id="bet-list" className="col-lg-4 col-sm-12">
                                <ul className="list-unstyled d-flex flex-lg-column flex-md-row nowrap" style={{ overflowX: 'auto' }}>
                                    {rooms.map(room => (
                                        <BetItem key={room.id} room={room} onClick={() => setSelectedRoom(room)} isSelected={room.id === selectedRoom?.id} />
                                    ))}
                                </ul>
                            </div>
                            <BetItemResume room={selectedRoom} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

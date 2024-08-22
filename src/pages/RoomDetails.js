import Background from "../components/Background";
import BetItemResume from "../components/Dashboard/BetItemResume";
import Intro from "../components/Dashboard/Intro";
import Match from "../components/Dashboard/Match";
import Sidebar from "../components/Sidebar/Sidebar";
import { useLocation } from 'react-router-dom';
import { getBets } from "../services/bets";
import { useEffect, useState } from "react";
import RoomBetItem from "../components/Bets/BetCard";
import BetCard from "../components/Bets/BetCard";
import { updateBet } from "../services/bets";
import { deleteBet } from "../services/bets";
import './RoomDetails.css';


function RoomDetails() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const location = useLocation();
    const { room } = location.state || {};

    // Declare hooks before any conditional logic
    const [bets, setBets] = useState([]);

    useEffect(() => {
        loadBets();
    }, []);

    const loadBets = async () => {
        if (!currentUser || !currentUser.id) {
            console.error('No current user found in localStorage');
            return;
        }

        try {
            const betsData = await getBets();
            const betsList = Object.entries(betsData).map(([id, bet]) => ({ id, ...bet }));
            setBets(betsList);
        } catch (error) {
            console.error('Error loading bets:', error);
        }
    };

    // Conditional logic comes after hooks
    if (!room) {
        return <div>No room data available</div>;
    }

    return (
        <>
            <Background />
            <div className="content container-fluid">
                <div id="container" className="row">
                    <Sidebar />
                    <div id="dashboard" className="col-xl-9 col-lg-12 col-12">
                        <Intro title="Room Details" introText={''} imgUrl={currentUser?.imgUrl} />

                        <div className="p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px' }}>
                            <Match room={room} currentUser={currentUser}/>
                        </div>

                        <div id="bet-list" className="col-12">
                            <ul className="list-unstyled d-flex flex-column flex-lg-column flex-md-row nowrap" style={{ overflowX: 'auto' }}>
                                {bets.map(bet => (
                                    
                                    currentUser.id === bet.owner &&
                                    <BetCard isOwner={currentUser.id === bet.owner} betData={bet} updateBet={updateBet} deleteBet={deleteBet}/>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomDetails;

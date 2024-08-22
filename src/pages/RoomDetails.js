import React, { useEffect, useState } from 'react';
import Background from "../components/Background";
import Intro from "../components/Dashboard/Intro";
import Match from "../components/Dashboard/Match";
import Sidebar from "../components/Sidebar/Sidebar";
import { useLocation } from 'react-router-dom';
import { getBets, updateBet, deleteBet } from "../services/bets";
import './RoomDetails.css';
import BetCard from "../components/Bets/BetCard";
import BetModal from "../components/Modals/BetModal";
import { createBet } from "../services/userBets";

function RoomDetails() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const location = useLocation();
    const { room } = location.state || {};

    const [bets, setBets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBet, setSelectedBet] = useState(null);
    const [betOptions, setBetOptions] = useState([]);

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
            
            setBetOptions([...new Set(betsList.flatMap(bet => bet.options))]); // Ajuste conforme a estrutura dos dados
        } catch (error) {
            console.error('Error loading bets:', error);
        }
    };

    const handlePlaceBet = (bet) => {
        setSelectedBet(bet);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (selectedOption, betAmount) => {
        if (!currentUser || !currentUser.id) {
            console.error('No current user found in localStorage');
            return;
        }

        try {
            await createBet(currentUser.id, room.id, selectedBet.id, betAmount, selectedOption);
            alert('Bet placed successfully!');
            loadBets(); // Recarregar as apostas para refletir as mudanças
        } catch (error) {
            console.error('Error placing bet:', error);
            alert('An error occurred while placing the bet.');
        }
    };

    if (!room) {
        return <div>No room data available</div>;
    }

    function checkOwnership(bet) {
        return (bet.roomId === room.id);
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
                                    checkOwnership(bet) &&
                                    <BetCard
                                        key={bet.id}
                                        isOwner={currentUser.id === bet.owner}
                                        betData={bet}
                                        userId={currentUser.id}
                                        roomId={room.id}
                                        updateBet={updateBet}
                                        deleteBet={deleteBet}
                                        onPlaceBet={() => handlePlaceBet(bet)}
                                    />
                                ))}
                            </ul>
                        </div>
                        <BetModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            betOptions={betOptions}
                            onSubmit={handleModalSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomDetails;

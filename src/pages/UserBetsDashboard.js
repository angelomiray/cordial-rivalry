import React, { useEffect, useState } from 'react';
import Background from "../components/Background";
import Resume from "../components/BetsDashboard/Resume";
import Intro from "../components/Dashboard/Intro";
import Sidebar from "../components/Sidebar/Sidebar";
import BetCard from "../components/Bets/BetCard"; // Certifique-se de que o caminho está correto
import { getUserBets } from "../services/userBets";
import UserBetCard from '../components/BetsDashboard/UserBetCard';

function UserBetsDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [userBets, setUserBets] = useState([]);

    useEffect(() => {
        // Função para buscar as apostas do usuário atual
        const fetchUserBets = async () => {
            try {
                const bets = await getUserBets(currentUser.id);
                setUserBets(bets);
            } catch (error) {
                console.error('Erro ao buscar apostas do usuário:', error);
            }
        };
        console.log(userBets);
        fetchUserBets();
    }, [currentUser.id]);

    return (
        <>
            <Background />
            <div className="content container-fluid">
                <div id="container" className="row">
                    <Sidebar />

                    <div id="dashboard" className="col-xl-9 col-lg-12 col-12">
                        <Intro
                            introText="Your Bets Dashboard"
                            imgUrl={currentUser.imgUrl}
                            title=''
                        />

                        <div id="content" className="m-auto col-12">

                            <Resume />
                            <div id="bet-list" className="col-12">
                                <ul className="list-unstyled d-flex flex-column flex-lg-column flex-md-row nowrap" style={{ overflowX: 'auto' }}>
                                    {userBets.map(bet => (
                                        <UserBetCard
                                            userBet={bet}
                                        />
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserBetsDashboard;

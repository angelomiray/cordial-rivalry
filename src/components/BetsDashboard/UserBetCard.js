// src/components/BetsDashboard/UserBetCard.js

import React from 'react';
import PropTypes from 'prop-types';
import './UserBetCard.css'; // Certifique-se de criar este arquivo CSS para os estilos

function UserBetCard({ userBet }) {
    return (
        <li className="user-bet-card d-flex align-items-center p-3 mb-3">
            <div className="bet-info flex-grow-1">
                <h5 className="bet-title mb-1">{userBet.betId}</h5>
                <p className="bet-room text-muted mb-1">Room: {userBet.roomId}</p>
                <p className="bet-option text-muted">Selected Option: {userBet.selectedOption}</p>
            </div>
            <div className="bet-amount">
                <span className="amount-label text-muted">Amount:</span>
                <span className="amount-value">{userBet.amount}</span>
            </div>
        </li>
    );
}

UserBetCard.propTypes = {
    userBet: PropTypes.shape({
        betId: PropTypes.string.isRequired,
        roomId: PropTypes.string.isRequired,
        selectedOption: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
    }).isRequired,
};

export default UserBetCard;

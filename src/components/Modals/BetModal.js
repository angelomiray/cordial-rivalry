import React, { useState } from 'react';
import './BetModal.css'; // Para estilização do modal

const BetModal = ({ isOpen, onClose, betOptions, onSubmit }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [betAmount, setBetAmount] = useState('');

    const handleSubmit = () => {
        if (!selectedOption || !betAmount) {
            alert('Please select an option and enter an amount.');
            return;
        }
        onSubmit(selectedOption, betAmount);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="modal-title">Place Your Bet</span>
                    <button className="modal-close" onClick={onClose}>
                        &times; {/* Caracter × como botão de fechar */}
                    </button>
                </div>
                <div className="modal-body">
                    <div>
                        <label htmlFor="bet-options">Select an Option:</label>
                        <select
                            id="bet-options"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <option value="">Select an option</option>
                            {betOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bet-amount">Enter Bet Amount:</label>
                        <input
                            id="bet-amount"
                            type="number"
                            min="1"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-button btn-info px-5 py-3" onClick={handleSubmit}>
                        Place Bet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BetModal;

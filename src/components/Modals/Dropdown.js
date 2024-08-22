import React, { useState } from 'react';
import './Dropdown.css'; // Certifique-se de criar este arquivo CSS

function Dropdown({ room, currentUser }) {
    const [showOptions, setShowOptions] = useState(false);
    const isOwner = currentUser && currentUser.id === room.ownerId;

    const handleToggleOptions = () => {
        setShowOptions(prev => !prev);
    };

    const handleCopyRoomCode = () => {
        navigator.clipboard.writeText(room.link)
            .then(() => alert('Room code copied to clipboard!'))
            .catch(err => console.error('Failed to copy room code: ', err));
    };

    const handleConfigureRoom = () => {
        // Navigation logic here
        console.log('Configure Room');
    };

    const handleCreateBet = () => {
        // Navigation logic here
        console.log('Create a New Bet');
    };

    return (
        <div className="dropdown-container">
            <button className="dropdown-button" onClick={handleToggleOptions}>
                <i className="fas fa-ellipsis-v"></i>
            </button>
            {showOptions && (
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleCopyRoomCode}>Copy Room Code</button>
                    <button className="dropdown-item" onClick={handleConfigureRoom}>Configure Room</button>
                    <button className="dropdown-item" onClick={handleCreateBet}>Create a New Bet</button>
                </div>
            )}
        </div>
    );
}

export default Dropdown;

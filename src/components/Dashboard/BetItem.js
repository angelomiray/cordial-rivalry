import React from 'react';
import './BetItem.css';

function BetItem({ room, onClick, isSelected }) {
    return (
        <li
            className={`mb-3 mr-sm-3 ${isSelected ? 'selected' : ''}`}
            style={{ cursor: 'pointer' }}
            data-room-id={room.link}
            onClick={onClick}
        >
            <img src={room.imgUrl} alt={room.title} />
            <div className="bet-info">
                <span>{room.title}</span>
                <h4>{room.subtitle}</h4>
                <h3>May 15</h3>
            </div>
        </li>
    );
}

export default BetItem;

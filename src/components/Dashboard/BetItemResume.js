import { Link, useNavigate } from 'react-router-dom';
import './BetItemResume.css';
import Match from './Match';

function BetItemResume({ room }) {
    const navigate = useNavigate();

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div id="bet-resume" className="bet-resume col-lg-8 col-sm-12 p-3">
            <Match room={room}/>
            <div className="room-participants d-flex flex-column mb-4">
                <ul id="participant-list" className="list-unstyled d-flex flex-row justify-content-center">
                    {room.participants?.map(participant => (
                        <li key={participant.id}><img src={participant.imgUrl} alt="" /></li>
                    ))}
                </ul>
                <p id="participants-info" className="m-auto">{room.participants?.map(p => p.name).join(', ')} and more are in this room...</p>
            </div>

            <a
                onClick={() => navigate("/RoomDetails", { state: { room } })}
                id="join-room-link"
                className="m-auto p-3 border rounded border-danger text-light"
            >
                See Room
            </a>
        </div>
    );
}

export default BetItemResume;

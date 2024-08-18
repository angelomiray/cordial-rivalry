import './BetItemResume.css';

function BetItemResume({ room }) {
    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div id="bet-resume" className="bet-resume col-lg-8 col-sm-12 p-3">
            <h2 id="room-title">{room.title || 'Room Title'}</h2>
            <h4 id="room-subtitle">{room.subtitle || 'Room Subtitle'}</h4>
            <div className="sb-line d-flex flex-wrap">
                <div className="choice-img" id="team1">
                    <img src={room.team1?.imgUrl} alt="" /><br />
                    <h3>{room.team1?.name}</h3>
                </div>
                <h3>vs</h3>
                <div className="choice-img" id="team2">
                    <img src={room.team2?.imgUrl} alt="" /><br />
                    <h3>{room.team2?.name}</h3>
                </div>
            </div>
            <p id="room-description" style={{ textAlign: 'center' }}>{room.description || 'Room Description'}</p>
            <div className="room-participants d-flex flex-column mb-4">
                <ul id="participant-list" className="list-unstyled d-flex flex-row justify-content-center">
                    {room.participants?.map(participant => (
                        <li key={participant.id}><img src={participant.imgUrl} alt="" /></li>
                    ))}
                </ul>
                <p id="participants-info" className="m-auto">{room.participants?.map(p => p.name).join(', ')} and more are in this room...</p>
            </div>
            <a id="join-room-link" className="m-auto p-3 border rounded border-danger text-light" href={`#`}>
                See Room
            </a>
        </div>
    );
}

export default BetItemResume;

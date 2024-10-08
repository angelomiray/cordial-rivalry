import React, { useState, useEffect } from 'react';
import EditModal from '../components/Modals/EditModal';
import Background from '../components/Background';
import Sidebar from '../components/Sidebar/Sidebar';
import PropTypes from 'prop-types';
import './RoomSettings.css';
import { updateRoom } from '../services/room'; // Importe a função para atualizar a sala

const RoomSettings = ({ room }) => {
    const [modalField, setModalField] = useState('');
    const [roomData, setRoomData] = useState({
        title: '',
        subtitle: '',
        description: '',
        teamOneName: '',
        teamOneUrl: '',
        teamTwoName: '',
        teamTwoUrl: ''
    });

    useEffect(() => {
        if (room) {
            setRoomData({
                title: room.title || 'Room Title',
                subtitle: room.subtitle || 'Room Subtitle',
                description: room.description || 'Room Description',
                teamOneName: room.teamOneName || 'name',
                teamOneUrl: room.teamOneUrl || 'url',
                teamTwoName: room.teamTwoName || 'name',
                teamTwoUrl: room.teamTwoUrl || 'url'
            });
        }
    }, [room]);

    const handleEdit = (field) => {
        setModalField(field);
    };

    const handleSave = (field, value) => {
        setRoomData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSaveChanges = async () => {
        try {
            // Atualiza a sala com os dados modificados
            await updateRoom(room.id, roomData);
            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Failed to save changes:', error);
        }
    };

    const handleDeleteRoom = () => {
        // Lógica para excluir a sala, se necessário
        alert('Room closed and prizes sent to winners.');
    };

    return (
        <>
            <Background />
            <div id="container" className="row">
                <Sidebar />
                <div id="dashboard" className="col-xl-9 col-lg-12 col-12">
                    <div id="intro" className="d-flex flex-column flex-md-row align-items-center justify-content-between mt-5 mb-3">
                        <h1 className="text-light">Room Settings</h1>
                    </div>

                    <div id="signin-form" className="d-flex p-3 mx-auto flex-wrap">
                        <div className="col-lg-4 col-sm-12 p-5">
                            <div className="image-container">
                                <img src={room?.imgUrl || ''} alt="Room" />
                                <div className="overlay">
                                    <button onClick={() => handleEdit('imgUrl')}>
                                        <i className="fas fa-edit text-info"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column col-lg-7 col-sm-12 p-lg-5 p-0">
                            {['title', 'subtitle', 'description', 'teamOneName', 'teamOneUrl', 'teamTwoName', 'teamTwoUrl'].map(field => (
                                <div key={field} className="info" data-field={field}>
                                    <div>
                                        <h3>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
                                        <h4>{roomData[field]}</h4>
                                    </div>
                                    <button onClick={() => handleEdit(field)}>
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            ))}
                            <div className="info" data-field="delete">
                                <div>
                                    <h3>Close</h3>
                                    <h4>Once you close this room, you will not be able to open it again. The prizes will be sent to the winners.</h4>
                                </div>
                                <button id="deleteRoomButton" onClick={handleDeleteRoom}>
                                    <i className="fa-solid fa-lock text-warning"></i>
                                </button>
                            </div>
                            <button id="saveChanges" className="btn btn-info ml-auto mt-4 py-4 text-center" style={{ fontSize: '18px' }} onClick={handleSaveChanges}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Include the modal component */}
            <EditModal field={modalField} currentValue={roomData[modalField]} onSave={handleSave} onClose={() => setModalField('')} />
        </>
    );
};

RoomSettings.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        description: PropTypes.string,
        teamOneName: PropTypes.string,
        teamOneUrl: PropTypes.string,
        teamTwoName: PropTypes.string,
        teamTwoUrl: PropTypes.string,
        imgUrl: PropTypes.string
    }).isRequired
};

export default RoomSettings;

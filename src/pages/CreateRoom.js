import React, { useState } from 'react';
import Background from "../components/Background";
import Sidebar from "../components/Sidebar/Sidebar";
import FormHeader from "../components/Forms/FormHeader";
import InputContainer from "../components/Forms/InputContainer";
import { Modal, Button } from 'react-bootstrap';
import './CreateRoom.css'; // Import the custom CSS file
import { saveRoom } from '../services/room'; // Import the saveRoom function
import Intro from '../components/Dashboard/Intro';
import { showAlert } from '../utils/alerts';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
    const [showModal, setShowModal] = useState(false);
    const [teamImgUrl, setTeamImgUrl] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teams, setTeams] = useState([]);
    const [roomData, setRoomData] = useState({
        title: '',
        subtitle: '',
        description: '',
        imgUrl: '',
    });
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const navigate = useNavigate();

    const handleImgUrlChange = (e) => {
        setTeamImgUrl(e.target.value);
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleRoomDataChange = (e) => {
        const { name, value } = e.target;
        setRoomData((prevData) => ({ ...prevData, [name]: value }));
    };

    const addTeam = (e) => {
        e.preventDefault();

        if (teamName && teamImgUrl) {
            if (teams.length >= 2) {
                alert('Você pode adicionar no máximo 2 times.');
                return;
            }

            setTeams((prevTeams) => [...prevTeams, { name: teamName, imgUrl: teamImgUrl }]);
            setTeamName('');
            setTeamImgUrl('');
            handleClose();
        } else {
            alert('Please provide both team name and image URL.');
        }
    };

    const removeTeam = (index) => {
        setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format teams into team1 and team2 properties
            const formattedTeams = {
                team1: teams[0] || { name: '', imgUrl: '' },
                team2: teams[1] || { name: '', imgUrl: '' }
            };

            const roomId = await saveRoom({ ...roomData, ...formattedTeams });
            console.log('Sala criada com sucesso:', roomId);
        } catch (error) {
            console.error('Erro ao criar sala:', error);
        }

        navigate('/dashboard');
    };

    return (
        <>
            <Background />
            <div className="content container-fluid">
                <div id="container" className="row">
                    <Sidebar />
                    <div id="dashboard" className="col-xl-9 col-lg-12 col-12">
                        <Intro title="Create a New Room" introText={currentUser?.fname} imgUrl={currentUser?.imgUrl} />

                        <div id="signin-card" className="col-md-12 col-12">
                            <form id="signin-form" className="p-5" onSubmit={handleSubmit}>
                                <FormHeader
                                    title="Room Creation Form"
                                    subtitle={
                                        <>
                                            Enter the information of the room you will create. This information will appear for friends you invite. <br />
                                            After the creation, we will provide a code for this room.
                                        </>
                                    }
                                />

                                <div className="hr-container">
                                    <span className="hr-text" style={{ fontWeight: 'bold', fontSize: '22px' }}>
                                        Event Information
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between flex-wrap col-12">
                                    <InputContainer
                                        iconClass="fas fa-heading"
                                        type="text"
                                        placeholder="Title"
                                        id="title"
                                        name="title"
                                        value={roomData.title}
                                        onChange={handleRoomDataChange}
                                        inputClass="col-6"
                                    />
                                    <InputContainer
                                        iconClass="fas fa-heading"
                                        type="text"
                                        placeholder="Subtitle"
                                        id="subtitle"
                                        name="subtitle"
                                        value={roomData.subtitle}
                                        onChange={handleRoomDataChange}
                                        inputClass="col-6"
                                    />
                                </div>
                                <InputContainer
                                    iconClass="fas fa-align-left"
                                    type="text"
                                    placeholder="Description"
                                    id="description"
                                    name="description"
                                    value={roomData.description}
                                    onChange={handleRoomDataChange}
                                    inputClass="col-12"
                                />

                                <InputContainer
                                    iconClass="fas fa-image"
                                    type="text"
                                    placeholder="Event picture"
                                    id="imgUrl"
                                    name="imgUrl"
                                    value={roomData.imgUrl}
                                    onChange={handleRoomDataChange}
                                    inputClass="col-12"
                                />
                                <div className="hr-container d-flex justify-content-between">
                                    <span className="hr-text" style={{ fontWeight: 'bold', fontSize: '22px' }}>
                                        Event Teams
                                    </span>
                                    <Button
                                        className="col-2"
                                        variant="link"
                                        onClick={handleShow}
                                        style={{ backgroundColor: 'transparent', border: 'none', textAlign: 'right' }}
                                    >
                                        <i
                                            className="fa-solid fa-plus"
                                            style={{ fontSize: '18px', border: '1px solid greenyellow', padding: '20px', borderRadius: '50px', backgroundColor: 'greenyellow' }}
                                        ></i>
                                    </Button>
                                </div>

                                <div className="team-cards-container row justify-content-between mb-5">
                                    {teams.map((team, index) => (
                                        <div key={index} className="team-card col-lg-5 col-12 mb-3 d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <img id={`team${index + 1}ImgUrl`} src={team.imgUrl} alt={`Team ${team.name}`} />
                                                <h3 id={`team${index + 1}Name`}>{team.name}</h3>
                                            </div>
                                            <button
                                                className="delete-btn p-1"
                                                style={{ backgroundColor: 'transparent', border: 'none' }}
                                                onClick={() => removeTeam(index)}
                                            >
                                                <i style={{ fontSize: '22px', marginTop: 'auto' }} className="fas fa-trash-alt text-danger"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center">
                                    <button id="createRoomButton" type="submit" className='btn btn-danger py-3 col-lg-4 col-12'> Create Room </button>
                                </div>

                                {/* Modal Component */}
                                <Modal show={showModal} onHide={handleClose} centered>
                                    <Modal.Header closeButton className='custom-modal'>
                                        <Modal.Title className="text-white">Add a Team to your Event</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="custom-modal">
                                        <div className="d-flex flex-column">
                                            <div className="form-group input-container">
                                                <i className="fas fa-heading"></i>
                                                <input
                                                    type="text"
                                                    placeholder="Team Name"
                                                    className="form-control text-light"
                                                    id="teamNameField"
                                                    style={{ fontSize: '22px' }}
                                                    value={teamName}
                                                    onChange={handleTeamNameChange}
                                                />
                                            </div>
                                            <div className="form-group input-container text-light">
                                                <i className="fas fa-image"></i>
                                                <input
                                                    type="text"
                                                    placeholder="Team image URL"
                                                    className="form-control text-light"
                                                    id="teamImgUrl"
                                                    style={{ fontSize: '22px' }}
                                                    value={teamImgUrl}
                                                    onChange={handleImgUrlChange}
                                                />
                                            </div>
                                            <div className="img-container mx-auto mb-3 rounded">
                                                <img id="teamImg" src={teamImgUrl || 'https://clipart-library.com/img/680593.png'} alt="Team" style={{ width: '150px', height: 'auto' }} />
                                            </div>
                                            <Button type="button" variant="info" className="mx-auto mt-3 py-3" onClick={addTeam}>
                                                Save
                                            </Button>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default CreateRoom;
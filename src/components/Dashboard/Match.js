import React, { useState } from 'react';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Para navegação
import { saveBet } from '../../services/bets'; // Importe a função saveBet da sua API

function Match({ room, currentUser }) {
    const navigate = useNavigate(); // Inicializa o hook de navegação
    const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal
    const [betTitle, setBetTitle] = useState('');
    const [betType, setBetType] = useState(''); // 'straight' ou 'multipla'
    const [options, setOptions] = useState(['', '']); // Inicialmente duas opções para aposta straight
    const isOwner = currentUser && currentUser.id === room.ownerId;

    const handleCopyRoomCode = () => {
        navigator.clipboard.writeText(room.link)
            .then(() => alert('Room code copied to clipboard!'))
            .catch(err => console.error('Failed to copy room code: ', err));
    };

    const handleConfigureRoom = () => {
        navigate('/roomSettings', { state: { room } }); // Navega para a tela de configurações
    };

    const handleCreateBet = () => {
        setShowModal(true); // Abre o modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Fecha o modal
        setBetTitle('');
        setBetType('');
        setOptions(['', '']);
    };

    const handleBetTypeChange = (e) => {
        const type = e.target.value;
        setBetType(type);
        if (type === 'straight') {
            setOptions(['', '']);
        } else if (type === 'multipla') {
            setOptions(['', '', '', '', '']);
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSaveBet = async () => {
        const betData = {
            title: betTitle,
            type: betType,
            imgUrl: room.imgUrl || '', // Usando a imagem do time 1 ou uma URL vazia se não existir
            roomId: room.id,
            owner: currentUser.id,
            status: 'active', // Ou outro status apropriado
            ...options.reduce((acc, option, index) => {
                acc[`option${index + 1}`] = option;
                return acc;
            }, {})
        };

        try {
            const betId = await saveBet(betData);
            console.log('Bet saved with ID:', betId);
            handleCloseModal(); // Fecha o modal após salvar
        } catch (error) {
            console.error('Failed to save bet:', error);
        }
    };

    return (
        <div className="match-container position-relative">
            <h2 id="room-title">{room.title || 'Room Title'}</h2>
            <h4 id="room-subtitle" className="text-secondary">{room.subtitle || 'Room Subtitle'}</h4>
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

            {isOwner && (
                <Dropdown className="position-absolute" style={{ top: '10px', right: '10px' }}>
                    <Dropdown.Toggle
                        id="dropdown-custom-components"
                        className="btn dropdown-toggle"
                        style={{ backgroundColor: 'transparent', border: 'none', color: 'transparent' }}
                    >
                        <i className="fa-solid fa-ellipsis-vertical" style={{ color: 'white' }}></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={handleCopyRoomCode}>Copy Room Code</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={handleConfigureRoom}>Configure Room</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={handleCreateBet}>Create a New Bet</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Bet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBetTitle">
                            <Form.Label>Bet Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter bet title"
                                value={betTitle}
                                onChange={(e) => setBetTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBetType">
                            <Form.Label>Bet Type</Form.Label>
                            <Form.Control as="select" value={betType} onChange={handleBetTypeChange}>
                                <option value="">Select type</option>
                                <option value="straight">Straight</option>
                                <option value="multipla">Multipla</option>
                            </Form.Control>
                        </Form.Group>
                        {betType && (
                            <div>
                                {options.map((option, index) => (
                                    <Form.Group key={index} controlId={`formOption${index}`}>
                                        <Form.Label>Option {index + 1}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={`Enter option ${index + 1}`}
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                        />
                                    </Form.Group>
                                ))}
                            </div>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveBet}>
                        Save Bet
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Match;

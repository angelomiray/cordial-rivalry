import React, { useState } from 'react';
import './BetCard.css';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { updateBet, deleteBet } from '../../services/bets'; // Ajuste conforme necessário
import { createBet } from '../../services/userBets';

function BetCard({ betData, isOwner, userId, roomId }) { // Adicione userId e roomId como props
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBetModal, setShowBetModal] = useState(false);
    const [betTitle, setBetTitle] = useState(betData.title);
    const [betType, setBetType] = useState(betData.type);
    const [options, setOptions] = useState([betData.option1, betData.option2, betData.option3, betData.option4, betData.option5]);
    const [selectedOption, setSelectedOption] = useState('');
    const [betAmount, setBetAmount] = useState('');

    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleOpenBetModal = () => {
        setShowBetModal(true);
    };

    const handleCloseBetModal = () => {
        setShowBetModal(false);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSave = async () => {
        const updatedBetData = {
            ...betData,
            title: betTitle,
            type: betType,
            ...options.reduce((acc, option, index) => {
                acc[`option${index + 1}`] = option;
                return acc;
            }, {})
        };

        try {
            await updateBet(betData.id, updatedBetData);
            handleCloseEditModal(); // Fecha o modal após atualizar
            window.location.reload();
        } catch (error) {
            console.error('Failed to update bet:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBet(betData.id, betData);
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete bet:', error);
        }
    };

    const handleBetSubmit = async () => {
        if (!selectedOption || !betAmount) {
            alert('Please select an option and enter an amount.');
            return;
        }
    
        try {
            await createBet(userId, roomId, betData.id, betAmount, selectedOption);
            handleCloseBetModal();
        } catch (error) {
            console.error('Failed to place bet:', error);
        }
    };
    

    return (
        <div className="card d-flex mb-2 p-3 mt-3">
            <div className="card-header d-flex justify-content-between flex-row  align-items-center flex-wrap p-0">
                <div className="d-flex align-items-center mb-lg-0 mb-4 col-lg-5 col-sm-12">
                    <img className="img-fluid" src={betData.imgUrl} alt="Bet" />
                    <div className="ml-3">
                        <h4>{betData.title}</h4>
                        <h5 style={{ color: 'grey' }}>Created May 15</h5>
                    </div>
                </div>
                <div className="bet-info col-lg-7 col-sm-12 d-flex flex-row align-items-center">
                    <h5 className="col-lg-3">{betData.type.toUpperCase()}</h5>
                    <h5 className="col-lg-3" style={{ color: 'greenyellow' }}>{betData.status ? 'OPEN' : 'CLOSED'}</h5>
                    <a className="card-link col-lg-1" onClick={handleOpenBetModal}>
                        <i className="fas fa-dollar-sign"></i>
                    </a>
                    {isOwner && (
                        <Dropdown>
                            <Dropdown.Toggle
                                id="dropdown-custom-components"
                                className="btn dropdown-toggle"
                                style={{ backgroundColor: 'transparent', border: 'none', color: 'transparent' }}
                            >
                                <i className="fa-solid fa-ellipsis-vertical" style={{ color: 'white' }}></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={handleOpenEditModal}>Atualizar</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={handleDelete}>Deletar</Dropdown.Item>                                
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Bet</Modal.Title>
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
                            <Form.Control as="select" value={betType} onChange={(e) => setBetType(e.target.value)}>
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
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Bet Modal */}
            <Modal show={showBetModal} onHide={handleCloseBetModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Place Your Bet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBetOptions">
                            <Form.Label>Select an Option</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            >
                                <option value="">Select an option</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBetAmount">
                            <Form.Label>Enter Bet Amount</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBetModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleBetSubmit}>
                        Place Bet
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BetCard;

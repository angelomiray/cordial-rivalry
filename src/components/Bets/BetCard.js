import React, { useState } from 'react';
import './BetCard.css';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { updateBet, deleteBet } from '../../services/bets';

function BetCard({ betData, isOwner }) {
    const [showModal, setShowModal] = useState(false);
    const [betTitle, setBetTitle] = useState(betData.title);
    const [betType, setBetType] = useState(betData.type);
    const [options, setOptions] = useState([betData.option1, betData.option2, betData.option3, betData.option4, betData.option5]); // Ajuste conforme necessário

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
            handleCloseModal(); // Fecha o modal após atualizar
        } catch (error) {
            console.error('Failed to update bet:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBet(betData.id, betData);
            // Adicione lógica para atualizar a UI após a exclusão, se necessário
        } catch (error) {
            console.error('Failed to delete bet:', error);
        }
    };

    return (
        <div className="card mb-2 p-3 mt-3">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap p-0">
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
                    <a className="card-link col-lg-1" data-toggle="modal" href={`#betModal-${betData.id}`}>
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
                                <Dropdown.Item href="#" onClick={handleOpenModal}>Atualizar</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={handleDelete}>Deletar</Dropdown.Item>                                
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
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
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BetCard;

import React, { useState, useEffect } from 'react';
import './EditModal.css'; // Para estilização do modal

const EditModal = ({ field, currentValue, onSave, onClose }) => {
    const [value, setValue] = useState(currentValue || '');

    useEffect(() => {
        setValue(currentValue);
    }, [currentValue]);

    const handleSave = () => {
        onSave(field, value);
        onClose();
    };

    if (!field) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="modal-title">Edit {field}</span>
                    <button className="modal-close" onClick={onClose}>
                        &times; {/* Caracter × como botão de fechar */}
                    </button>
                </div>
                <div className="modal-body">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={`Enter new ${field}`}
                    />
                </div>
                <div className="modal-footer">
                    <button className="modal-button btn-info px-5 py-3" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;

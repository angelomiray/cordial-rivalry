import './InputContainer.css';

function InputContainer({ iconClass, type, placeholder, id, name, value, onChange, inputClass }) {
    return (
        <div className={`input-container ${inputClass}`}>
            <i className={iconClass}></i>
            <input 
                type={type} 
                placeholder={placeholder} 
                id={id} 
                name={name} 
                value={value} 
                onChange={onChange}                 
            />
        </div>
    );
}

export default InputContainer;

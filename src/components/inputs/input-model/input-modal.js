import './input-modal.scss'

const InputModal = ({ label, required, type = "text", value, onChange, className }) => {
    return (
        <div className={`custom-input-container ${className || ''}`}>
            <label className="custom-input-label">
                {label}{required && <span className="required">*</span>}:
            </label>
            <input
                type={type}
                className="custom-input"
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};


export default InputModal;


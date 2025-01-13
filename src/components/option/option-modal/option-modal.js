import'./option-modal.scss'


/**
 * @param label         Лейбл инпута
 * @param required      Обязательное ли поле
 * @param options       Загружаем сюда объект value={id} label={title}
 * @param value         Текущее значение
 * @param onChange      Event на изменение
 * @returns {JSX.Element}
 * @constructor
 */
const OptionModal = ({ label, required, options, value, onChange }) => {
    return (
        <div className="custom-select-container">
            <label className="custom-select-label">
                {label}{required && <span className="required">*</span>}:
            </label>
            <select
                className="custom-select"
                value={value}
                onChange={onChange}
                required={required}
            >
                <option value="" disabled>Выберите офис</option>
                {options.map((option) => (
                    <option value={option.id}>
                        {option.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default OptionModal;

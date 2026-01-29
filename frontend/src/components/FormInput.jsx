const FormInput = ({ type = 'text', placeholder, id, label, ...props }) => {
    return (
        <div className="mb-3">
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <input
                type={type}
                className="form-control"
                id={id}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

const FormCheckbox = ({ id, label, ...props }) => {
    return (
        <div className="mb-3">
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id={id} {...props} />
                <label className="form-check-label" htmlFor={id}>{label}</label>
            </div>
        </div>
    );
}

export { FormInput, FormCheckbox };

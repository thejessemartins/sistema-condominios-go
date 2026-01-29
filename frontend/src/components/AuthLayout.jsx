import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
    return (
        <div className="form-screen">
            <Link to="/" className="spur-logo" style={{ textDecoration: 'none' }}>
                <i className="bi bi-building-fill-down text-dark"></i> <span style={{ textDecoration: 'none' }}>Domus</span>
            </Link>
            {children}
        </div>
    );
};

export default AuthLayout;

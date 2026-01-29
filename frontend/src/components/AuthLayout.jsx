import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
    return (
        <div className="form-screen">
            <Link to="/" className="spur-logo" style={{ textDecoration: 'none' }}>
                <i className="bi bi-fullscreen"></i> <span style={{ textDecoration: 'none' }}>Dashboard</span>
            </Link>
            {children}
        </div>
    );
};

export default AuthLayout;

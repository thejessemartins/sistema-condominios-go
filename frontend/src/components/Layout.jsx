import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';


const Layout = () => {
  const { appName } = useConfig();
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileShow, setIsMobileShow] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); // Or specific keys like localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    if (window.innerWidth <= 991) {
      setIsMobileShow(!isMobileShow);
    } else {
      setIsCompact(!isCompact);
    }
  };

  const toggleProfile = (e) => {
    e.preventDefault();
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleUsers = (e) => {
    e.preventDefault();
    setIsUsersOpen(!isUsersOpen);
  };



  return (
    <div className={`dash ${isCompact ? 'dash-compact' : ''}`}>
      <div className={`dash-nav dash-nav-dark ${isMobileShow ? 'mobile-show' : ''}`}>
        <header>
          <a href="#!" className="menu-toggle" onClick={toggleMenu}>
            <i className="bi bi-list"></i>
          </a>
          <Link to="/dashboard" className="spur-logo" style={{ textDecoration: 'none' }}>
            <i class="bi bi-fullscreen text-white"></i> <span style={{ textDecoration: 'none' }}>{appName}</span>
          </Link>
        </header>
        <nav className="dash-nav-list">

          <Link to="/dashboard" className={`dash-nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <i className="bi bi-grid-1x2"></i> Painel
          </Link>

          <div className={`dash-nav-dropdown ${isUsersOpen ? 'show' : ''}`}>
            <a href="#!" className="dash-nav-item dash-nav-dropdown-toggle" onClick={toggleUsers} style={{ textDecoration: 'none' }}>
              <i className="bi bi-people"></i> Usuários
            </a>
            <div className={`dash-nav-dropdown-menu ${isUsersOpen ? 'show' : ''}`}>
              <Link to="/dashboard/users/create" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Criar Usuário</Link>
              <Link to="/dashboard/users" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Visualizar Usuários</Link>
            </div>
          </div>



        </nav>
      </div>

      <div className="dash-app">
        <header className="dash-toolbar">
          <a href="#!" className="menu-toggle" onClick={toggleMenu}>
            <i className="bi bi-list"></i>
          </a>

          <div className="tools">

            <div className={`dropdown tools-item ${isProfileOpen ? 'show' : ''}`}>
              <a href="#" className="" id="dropdownMenu1" onClick={toggleProfile} aria-haspopup="true" aria-expanded={isProfileOpen}>
                <i className="bi bi-gear" style={{ fontSize: '20px' }}></i>
              </a>
              <div className={`dropdown-menu dropdown-menu-end ${isProfileOpen ? 'show' : ''}`} aria-labelledby="dropdownMenu1">
                <Link className="dropdown-item" to="/dashboard/settings">Configurações</Link>
                <a className="dropdown-item" href="#!" onClick={handleLogout}>Sair</a>
              </div>
            </div>
          </div>
        </header>

        <main className="dash-content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

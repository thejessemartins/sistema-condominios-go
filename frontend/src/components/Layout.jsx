import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';


const Layout = () => {
  const { appName } = useConfig();
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileShow, setIsMobileShow] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isPessoasOpen, setIsPessoasOpen] = useState(false);
  const [isCadastrosOpen, setIsCadastrosOpen] = useState(false);
  const [isFinanceiroOpen, setIsFinanceiroOpen] = useState(false);
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



  const togglePessoas = (e) => {
    e.preventDefault();
    setIsPessoasOpen(!isPessoasOpen);
  };

  const toggleCadastros = (e) => {
    e.preventDefault();
    setIsCadastrosOpen(!isCadastrosOpen);
  };

  const toggleFinanceiro = (e) => {
    e.preventDefault();
    setIsFinanceiroOpen(!isFinanceiroOpen);
  };



  return (
    <div className={`dash ${isCompact ? 'dash-compact' : ''}`}>
      <div className={`dash-nav dash-nav-dark ${isMobileShow ? 'mobile-show' : ''}`}>
        <header>
          <a href="#!" className="menu-toggle" onClick={toggleMenu}>
            <i className="bi bi-list"></i>
          </a>
          <Link to="/dashboard" className="spur-logo" style={{ textDecoration: 'none' }}>
            <i className="bi bi-fullscreen text-white"></i> <span style={{ textDecoration: 'none' }}>{appName}</span>
          </Link>
        </header>
        <nav className="dash-nav-list">

          <Link to="/dashboard" className={`dash-nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <i className="bi bi-grid-1x2"></i> Painel
          </Link>

          <div className={`dash-nav-dropdown ${isPessoasOpen ? 'show' : ''}`}>
            <a href="#!" className="dash-nav-item dash-nav-dropdown-toggle" onClick={togglePessoas} style={{ textDecoration: 'none' }}>
              <i className="bi bi-people"></i> Pessoas
            </a>
            <div className={`dash-nav-dropdown-menu ${isPessoasOpen ? 'show' : ''}`}>
              <Link to="/dashboard/clientes" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Clientes</Link>
              <Link to="/dashboard/users" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Usuários</Link>
              <Link to="/dashboard/funcionarios" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Funcionários</Link>
              <Link to="/dashboard/fornecedores" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Fornecedores</Link>
            </div>
          </div>

          <div className={`dash-nav-dropdown ${isCadastrosOpen ? 'show' : ''}`}>
            <a href="#!" className="dash-nav-item dash-nav-dropdown-toggle" onClick={toggleCadastros} style={{ textDecoration: 'none' }}>
              <i className="bi bi-plus-lg"></i> Cadastros
            </a>
            <div className={`dash-nav-dropdown-menu ${isCadastrosOpen ? 'show' : ''}`}>
              <Link to="/dashboard/formas-pgto" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Formas Pgto</Link>
              <Link to="/dashboard/frequencias" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Frequências</Link>
              <Link to="/dashboard/cargos" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Cargos</Link>
              <Link to="/dashboard/grupos" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Grupos</Link>
              <Link to="/dashboard/acessos" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Acessos</Link>
            </div>
          </div>

          <div className={`dash-nav-dropdown ${isFinanceiroOpen ? 'show' : ''}`}>
            <a href="#!" className="dash-nav-item dash-nav-dropdown-toggle" onClick={toggleFinanceiro} style={{ textDecoration: 'none' }}>
              <i className="bi bi-currency-dollar"></i> Financeiro
            </a>
            <div className={`dash-nav-dropdown-menu ${isFinanceiroOpen ? 'show' : ''}`}>
              <Link to="/dashboard/receber" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Receber</Link>
              <Link to="/dashboard/despesas" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Despesas</Link>
              <Link to="/dashboard/relatorio-financeiro" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Relatório Financeiro</Link>
              <Link to="/dashboard/rel-sintetico-despesas" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Rel Sintético Despesas</Link>
              <Link to="/dashboard/rel-sintetico-receber" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Rel Sintético Receber</Link>
              <Link to="/dashboard/rel-balanco-anual" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Rel Balanço Anual</Link>
              <Link to="/dashboard/rel-inadimplentes" className="dash-nav-dropdown-item" style={{ textDecoration: 'none' }}>Rel Inadimplentes</Link>
            </div>
          </div>

          <Link to="/dashboard/caixas" className={`dash-nav-item ${location.pathname === '/dashboard/caixas' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <i className="bi bi-briefcase"></i> Caixas <span className="text-success ms-1 small">(Aberto)</span>
          </Link>

          <Link to="/dashboard/tarefas" className={`dash-nav-item ${location.pathname === '/dashboard/tarefas' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
            <i className="bi bi-calendar-event"></i> Tarefas / Agenda
          </Link>

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

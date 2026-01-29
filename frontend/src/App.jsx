import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from './contexts/ConfigContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';


import UserList from './pages/Users/UserList';
import UserForm from './pages/Users/UserForm';

import Settings from './pages/Settings';

import UnderConstruction from './pages/UnderConstruction';

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />


          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/create" element={<UserForm />} />
            <Route path="users/edit/:id" element={<UserForm />} />
            <Route path="settings" element={<Settings />} />

            {/* Pessoas */}
            <Route path="clientes" element={<UnderConstruction />} />
            <Route path="funcionarios" element={<UnderConstruction />} />
            <Route path="fornecedores" element={<UnderConstruction />} />

            {/* Cadastros */}
            <Route path="formas-pgto" element={<UnderConstruction />} />
            <Route path="frequencias" element={<UnderConstruction />} />
            <Route path="cargos" element={<UnderConstruction />} />
            <Route path="grupos" element={<UnderConstruction />} />
            <Route path="acessos" element={<UnderConstruction />} />

            {/* Financeiro */}
            <Route path="receber" element={<UnderConstruction />} />
            <Route path="despesas" element={<UnderConstruction />} />
            <Route path="relatorio-financeiro" element={<UnderConstruction />} />
            <Route path="rel-sintetico-despesas" element={<UnderConstruction />} />
            <Route path="rel-sintetico-receber" element={<UnderConstruction />} />
            <Route path="rel-balanco-anual" element={<UnderConstruction />} />
            <Route path="rel-inadimplentes" element={<UnderConstruction />} />

            {/* Outros */}
            <Route path="caixas" element={<UnderConstruction />} />
            <Route path="tarefas" element={<UnderConstruction />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

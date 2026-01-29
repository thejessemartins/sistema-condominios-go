import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/Card';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await fetch(`http://localhost:8080/api/users/${id}`, { method: 'DELETE' });
                fetchUsers();
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
            }
        }
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="spur-card">
                    <CardHeader>
                        <div className="spur-card-icon">
                            <i className="bi bi-people"></i>
                        </div>
                        <div className="spur-card-title">Usuários Cadastrados</div>
                    </CardHeader>
                    <CardBody>
                        <table className="table table-hover table-in-card">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info mr-1"
                                                onClick={() => navigate(`/dashboard/users/edit/${user.id}`)}
                                                style={{ marginRight: '5px', color: '#fff' }}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UserList;

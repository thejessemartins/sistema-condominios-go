import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/Card';
import { FormInput } from '../../components/FormInput';

const UserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    name: data.name,
                    email: data.email,
                    password: '' // Don't populate password
                });
            } else {
                setError('Erro ao carregar usuário');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const url = id
                ? `http://localhost:8080/api/users/${id}`
                : 'http://localhost:8080/api/users';

            const method = id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/dashboard/users');
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao criar usuário');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor');
        }
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="spur-card">
                    <CardHeader>
                        <div className="spur-card-icon">
                            <i className="bi bi-person-plus"></i>
                        </div>
                        <div className="spur-card-title">{id ? 'Editar Usuário' : 'Novo Usuário'}</div>
                    </CardHeader>
                    <CardBody>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                id="name"
                                label="Nome"
                                placeholder="Nome completo"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                type="email"
                                id="email"
                                label="Email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                type="password"
                                id="password"
                                label="Senha"
                                placeholder="Senha (deixe em branco para manter)"
                                value={formData.password}
                                onChange={handleChange}
                                required={!id}
                            />
                            <button type="submit" className="btn btn-primary mt-3">{id ? 'Salvar Alterações' : 'Cadastrar'}</button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UserForm;

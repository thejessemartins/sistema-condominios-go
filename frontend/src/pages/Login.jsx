import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Card, CardHeader, CardBody } from '../components/Card';
import { FormInput, FormCheckbox } from '../components/FormInput';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                console.log('User logged in:', data);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                setError(data.message || 'Erro ao efetuar login');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor');
            console.error(err);
        }
    };

    return (
        <AuthLayout>
            <Card className="account-dialog">
                <CardHeader className="bg-primary text-white">
                    Login
                </CardHeader>

                <CardBody>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type="email"
                            id="exampleInputEmail1"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FormInput
                            type="password"
                            id="exampleInputPassword1"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FormCheckbox
                            id="customCheck1"
                            label="Lembrar-me"
                        />

                        <div className="account-dialog-actions">
                            <button type="submit" className="btn btn-primary">Entrar</button>

                        </div>
                    </form>
                </CardBody>
            </Card>
        </AuthLayout>
    );
};

export default Login;

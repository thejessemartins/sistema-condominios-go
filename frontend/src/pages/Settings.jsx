import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../components/Card';
import { FormInput, FormCheckbox } from '../components/FormInput';
import { useConfig } from '../contexts/ConfigContext';

const Settings = () => {
    const { appName, updateAppName } = useConfig();
    const [name, setName] = useState(appName);

    const handleUpdateName = (e) => {
        e.preventDefault();
        updateAppName(name);
        alert('Nome do aplicativo atualizado!');
    };
    return (
        <div className="row">

            <div className="col-12 col-md-6">
                <Card className="spur-card">
                    <CardHeader>
                        <div className="spur-card-icon">
                            <i className="bi bi-gear"></i>
                        </div>
                        <div className="spur-card-title">Configuração Geral</div>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleUpdateName}>
                            <FormInput
                                id="appName"
                                label="Nome do Dashboard"
                                placeholder="Ex: Meu Sistema"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary mt-3">Atualizar Nome</button>
                        </form>
                    </CardBody>
                </Card>
            </div>

            <div className="col-12 col-md-6">
                <Card className="spur-card">
                    <CardHeader>
                        <div className="spur-card-icon">
                            <i className="bi bi-sliders"></i>
                        </div>
                        <div className="spur-card-title">Preferências do Sistema</div>
                    </CardHeader>
                    <CardBody>
                        <FormCheckbox id="notifications" label="Receber notificações por email" defaultChecked />
                        <FormCheckbox id="darkMode" label="Modo Escuro (Beta)" />
                        <button className="btn btn-primary mt-3">Salvar Preferências</button>
                    </CardBody>
                </Card>
            </div>
        </div >
    );
};

export default Settings;

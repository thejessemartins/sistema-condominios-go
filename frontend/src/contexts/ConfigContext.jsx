import { createContext, useState, useEffect, useContext } from 'react';

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
    const [appName, setAppName] = useState('Dashboard');

    useEffect(() => {
        const storedName = localStorage.getItem('app_name');
        if (storedName) {
            setAppName(storedName);
        }
    }, []);

    const updateAppName = (name) => {
        setAppName(name);
        localStorage.setItem('app_name', name);
    };

    return (
        <ConfigContext.Provider value={{ appName, updateAppName }}>
            {children}
        </ConfigContext.Provider>
    );
};

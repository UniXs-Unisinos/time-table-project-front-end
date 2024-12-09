import React from  'react';
import classes from './LogoutButtonComponent.module.css';
interface LogoutButtonProps {
    onLogout : () => void; // função
}

const  LogoutButtonComponent: React.FC<LogoutButtonProps> = ({onLogout}) =>{
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout',{
                method: 'POST',
                headers: {
                    'Content-type': 'swagger.json',
                },
            });

            if (response.ok){
                onLogout();
                alert('Logout realizado com sucesso!');
            } else {
                console.error('Erro ao realizar logout');
            } 
        }catch(error) {
                console.error('Erro de conexão', error);
        }
    };

    return (
        <div className={classes.logout}>  
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
};

export default LogoutButtonComponent; 
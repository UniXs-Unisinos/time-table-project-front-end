import React from  'react';
import LoginButton from './LoginButtonComponent.module.css'
interface LogoutButtonProps {
    onLogout : () => void; // função
}

const  LogoutButton: React.FC<LogoutButtonProps> = ({onLogout}) =>{
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
        <div classname={classes.LoginButton}>  
            <button onClick={handleLogout}>
                Sair
            </button>
        <div/>
    );
};

export default LogoutButton;
import React, {useState} from "react";
import Swagger from 'swagger-client';
//import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const client = await Swagger({url: '../../swagger.json'})

            const reponse = await client.apis.dto.UpdateUserDto({email});
            console.log(reponse);
            //const response = await axios.post('SUA_API_URL/recuperar-senha', { email });
            setMessage('Um e-mail com as instruções foi enviado.');
        } catch (error) {
            setMessage('Ocorreu um erro ao enviar o e-mail.');
        }
    };

    return (
        <div>
            <h2>Recuperar Senha</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                    required
                />
                <button type="submit">Recuperar Senha</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;

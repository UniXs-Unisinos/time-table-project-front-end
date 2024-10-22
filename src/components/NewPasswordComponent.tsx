import React, {useState} from 'react';
import Swagger from 'swagger-client';

interface NewPasswordForm {
    email: string;
    newPassword: string;
}

const NewPasswordComponent:React.FC = () => {
    const [form, setForm] = useState<NewPasswordForm>({ email:'', newPassword:''});

   /* const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
        const { name, value } = e.target;
        setForm((prevFrom) =>({...prevForm,[name]: value}));
    }*/


    return (
        <>
            <p>Nova Senha: <input type="password" name="newpassword" id="newpassword"/></p>
            <p>Confirma: <input type="password" name="newpassword_confirm" id="newpassword_confirm"/></p>
        </>
    );
}

export default NewPasswordComponent
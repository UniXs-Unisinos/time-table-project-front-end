import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';
import css from './Login.module.css';

// Form to send to API
interface LoginForm {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(null); 

    try {
      const client = await SwaggerClient({ url: 'http://localhost:8080/' });

      // Call the login API with the form data
      const response = await client.apis.auth.auth_login({
        Login: {
          email: form.email,
          password: form.password,
        },
      });

      const authToken = response.data.access_token;
      console.log('Login successful, token:', authToken);

      // Storing authToken on local sotorage on browser
      localStorage.setItem('authToken', authToken);

      // Redirecting after login 
      window.location.href = '/home';  // Test using Home
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.login}>
      <h2></h2>

      <div className={css.login_container}>
        <label></label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="   Digite seu email"
          required
        />
      </div>

      <div className={css.login_container}>
        <label></label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="   Digite sua senha"
          required
        />
      </div>

      <div className={css.login_container}>
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Entrar'}
        </button>
      </div>
      
      <div className={css.login_esqueceuSenha}>
        <a href="/forgotpassword">Esqueceu sua senha?</a>
      </div>

      {/* Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
    
  );
};

export default LoginComponent;

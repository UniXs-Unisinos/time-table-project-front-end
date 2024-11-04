import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';
import css from './User.module.css'

interface UserForm {
  name: string;
  email: string;
  password: string;
}

const UserCreateComponent: React.FC = () => {
  const [form, setForm] = useState<UserForm>({ name: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle form submission
  const handleCreateUser = async () => {
    setLoading(true);
    setErrorMessage(null); 

    try {
      const client = await SwaggerClient({ url: '../../swagger.json' });
      const response = await client.apis.user.post_users({
        body: {
          name: form.name,
          email: form.email,
          password: form.password,
        },
      });

      setSuccessMessage('User created successfully!');
      console.log('User created:', response.data);

    } catch (error) {
      console.error('User creation failed:', error);
      setErrorMessage('Error creating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={css.user}>
      <h2>Create New User</h2>

      <div className={css.user_container}>
        <label>Nome Completo:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className={css.user_container}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className={css.user_container}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      <div className={css.user_container}>
        <button onClick={handleCreateUser} disabled={loading}>
          {loading ? 'Creating User...' : 'Create User'}
        </button>
      </div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UserCreateComponent;

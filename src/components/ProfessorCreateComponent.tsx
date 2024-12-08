import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';
import css from './ProfessorCreate.module.css'

interface ProfessorForm {
    hoursToAllocate: number;
    name: string;
  }
  
  const AvailabilityCreateComponent: React.FC = () => {
    const [form, setForm] = useState<ProfessorForm>({ name: '', email: '', subject: '' });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };
  
    const handleCreateProfessor = async () => {
      setLoading(true);
      setErrorMessage(null);  
  
      try {
        const client = await SwaggerClient({
          url: '../../swagger.json',
        });
  
        const response = await client.apis.professor.post_professors({
          body: {
            hourstoallocate: form.hoursToAllocate,
            name: form.name,
          },
        });
  
        setSuccessMessage('Professor created successfully!');
        console.log('Professor created:', response.data);
      } catch (error) {
        console.error('Professor creation failed:', error);
        setErrorMessage('Error creating professor. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className={css.professor}>
        <h2></h2>
  
        <div className={css.professor_container}>
          <label></label>
          <input
            type="text"
            name="hourstoallocate"
            value={form.hoursToAllocate}
            onChange={handleChange}
            placeholder="   Horas a serem alocadas"
            required
          />
        </div>

        <div className={css.professor_container}>
          <label></label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="   Nome do professor"
            required
          />
        </div>
  
        <div className={css.professor_container}>
          <button onClick={handleCreateProfessor} disabled={loading}>
            {loading ? 'Creating Professor...' : 'Criar Professor'}
          </button>
        </div>
  
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  };
  
  export default AvailabilityCreateComponent;
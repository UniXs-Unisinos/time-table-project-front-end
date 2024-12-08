import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';
import css from './AvailabilityCreate.module.css'

interface AvailabilityForm {
    dayOfWeek: string;
    professor_id: number;
    shift: string;
  }
  
  const AvailabilityCreateComponent: React.FC = () => {
    const [form, setForm] = useState<AvailabilityForm>({ dayOfWeek: '', professor_id: 0, shift: '' });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };
  
    const handleCreateAvailability = async () => {
      setLoading(true);
      setErrorMessage(null);  
  
      try {
        const client = await SwaggerClient({
          url: '../../swagger.json',
        });
  
        const response = await client.apis.availability.post_availabilities({
          body: {
            dayOfWeek: form.dayOfWeek,
            professor_id: form.professor_id,
            shift: form.shift,
          },
        });
  
        setSuccessMessage('Availability created successfully!');
        console.log('Availability created:', response.data);
      } catch (error) {
        console.error('Availability creation failed:', error);
        setErrorMessage('Error creating Availability. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className={css.availability}>
        <h2></h2>
  
        <div className={css.availability_container}>
          <label></label>
          <input
            type="text"
            name="dayOfWeek"
            value={form.dayOfWeek}
            onChange={handleChange}
            placeholder="   Dias da Semana"
            required
          />
        </div>

        <div className={css.availability_container}>
          <label></label>
          <input
            type="number"
            name="professor_id"
            value={form.professor_id}
            onChange={handleChange}
            placeholder="   Id do Professor responsável"
            required
          />
        </div>

        <div className={css.availability_container}>
          <label></label>
          <input
            type="number"
            name="shift"
            value={form.shift}
            onChange={handleChange}
            placeholder="   Escolha o Turno"
            required
          />
        </div>
  
        <div className={css.availability_container}>
          <button onClick={handleCreateAvailability} disabled={loading}>
            {loading ? 'Creating Availability...' : 'Criar Disponibilidade'}
          </button>
        </div>
  
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  };
  
  export default AvailabilityCreateComponent;
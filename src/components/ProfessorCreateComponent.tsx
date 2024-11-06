import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';

interface ProfessorForm {
    hoursToAllocate: number;
    name: string;
  }
  
  const ProfessorCreateComponent: React.FC = () => {
    const [form, setForm] = useState<ProfessorForm>({ hoursToAllocate: 0, name: ''});
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
            hoursToAllocate: form.hoursToAllocate,
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
      <div>
        <h2>Create New Professor</h2>
  
        <div>
            <label>Available Hours: </label>
            <input
            type="number"
            value={form.hoursToAllocate}
            onChange={handleChange}
            required
            />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter professor's name"
            required
          />
        </div>
        
        <div>
          <button onClick={handleCreateProfessor} disabled={loading}>
            {loading ? 'Creating Professor...' : 'Create Professor'}
          </button>
        </div>
  
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  };
  
  export default ProfessorCreateComponent;
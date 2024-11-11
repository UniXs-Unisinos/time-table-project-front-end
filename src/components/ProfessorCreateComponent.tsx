import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';

interface ProfessorForm {
    name: string;
    email: string;
    subject: string;
  }
  
  const ProfessorCreateComponent: React.FC = () => {
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
            name: form.name,
            email: form.email,
            subject: form.subject,
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
          <label>Name:</label>
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter professor's email"
            required
          />
        </div>

        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Enter subject taught by professor"
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
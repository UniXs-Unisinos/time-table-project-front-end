import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';
import css from './DisciplineCreate.module.css';

interface UserForm {
  course_id: number;
  credits: number;
  name: string;
}

const DisciplineCreateComponent: React.FC = () => {
  const [form, setForm] = useState<UserForm>({ course_id: 0, credits: 0, name: '' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle form submission
  const handleCreateDiscipline = async () => {
    setLoading(true);
    setErrorMessage(null);  // Reset any previous error messages

    try {
      const client = await SwaggerClient({ url: 'http://localhost:8080/' });

      const response = await client.apis.discipline.post_disciplines({
        body: {
          course_id: form.course_id,
          credits: form.credits,
          name: form.name,
        },
      });

      setSuccessMessage('Discipline created successfully!');
      console.log('Discipline created:', response.data);

    } catch (error) {
      console.error('Discipline creation failed:', error);
      setErrorMessage('Error creating discipline. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={css.discipline}>
      <h2></h2>

      <div className={css.discipline_container}>
        <label></label>
        <input
          type="number"
          name="course_id"
          value={form.course_id}
          onChange={handleChange}
          placeholder="   Insira o Id da disciplina"
          required
        />
      </div>

      <div className={css.discipline_container}>
        <label></label>
        <input
          type="number"
          name="credits"
          value={form.credits}
          onChange={handleChange}
          placeholder="   Insira a quantidade de Créditos"
          required
        />
      </div>

      <div className={css.discipline_container}>
        <label></label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="   Digite o Nome da Disciplina "
          required
        />
      </div>

      <div className={css.discipline_container}>
        <button onClick={handleCreateDiscipline} disabled={loading}>
          {loading ? 'Creating User...' : 'Criar Disciplina'}
        </button>
      </div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default DisciplineCreateComponent;

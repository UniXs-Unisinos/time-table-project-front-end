import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';
import css from './ParametrizationCreate.module.css'

interface ParametrizationForm {
    course_id: number;
    maxCreditsToOffer: number;
    numClassesPerDiscipline: number;
    semester_id: number;
  }
  
  const ParametrizationCreateComponent: React.FC = () => {
    const [form, setForm] = useState<ParametrizationForm>({ course_id:0, maxCreditsToOffer: 0, numClassesPerDiscipline: 0, semester_id: 0 });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };
  
    const handleCreateParametrization = async () => {
      setLoading(true);
      setErrorMessage(null);  
  
      try {
        const client = await SwaggerClient({
          url: '../../swagger.json',
        });
  
        const response = await client.apis.parametrization.post_parametrizations({
          body: {
            course_id: form.course_id,
            maxCreditsToOffer: form.maxCreditsToOffer,
            numClassesPerDiscipline: form.numClassesPerDiscipline,
            semester_id: form.semester_id},
        });
  
        setSuccessMessage('Parametrization created successfully!');
        console.log('Parametrization created:', response.data);
      } catch (error) {
        console.error('Parametrization creation failed:', error);
        setErrorMessage('Error creating Parametrization. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className={css.parametrization}>
        <h2></h2>
  
        <div className={css.parametrization_container}>
          <label></label>
          <input
            type="number"
            name="course_id"
            value={form.course_id}
            onChange={handleChange}
            placeholder="   Digite o Id do Curso"
            required
          />
        </div>

        <div className={css.parametrization_container}>
          <label></label>
          <input
            type="number"
            name="maxCreditsToOffer"
            value={form.maxCreditsToOffer}
            onChange={handleChange}
            placeholder="   Digite a quantidade máxima de créditos"
            required
          />
        </div>

        <div className={css.parametrization_container}>
          <label></label>
          <input
            type="number"
            name="numClassesPerDiscipline"
            value={form.numClassesPerDiscipline}
            onChange={handleChange}
            placeholder="   Digite o número de turmas por disciplina"
            required
          />
        </div>

        <div className={css.parametrization_container}>
          <label></label>
          <input
            type="number"
            name="semester_id"
            value={form.semester_id}
            onChange={handleChange}
            placeholder="   Digite o Id do Semestre"
            required
          />
        </div>
  
        <div className={css.parametrization_container}>
          <button onClick={handleCreateParametrization} disabled={loading}>
            {loading ? 'Creating Parametrization...' : 'Gerar Proposta'}
          </button>
        </div>
  
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  };
  
  export default ParametrizationCreateComponent;
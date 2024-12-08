import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';
import css from './CourseCreate.module.css';

interface CourseForm {
    location: string;
    modality:string;
    name: string;
}

const CourseCreateComponent: React.FC = () => {
  const [form, setForm] = useState<CourseForm>({ location: '',modality: '',name: ''});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleCreateCourse = async () => {
        setLoading(true);
        setErrorMessage(null);

        try {
        const client = await SwaggerClient({
            url: '../../swagger.json',
        });

        const response = await client.apis.course.post_courses({
            body: {
                location: form.location,
                modality: form.modality,
                name: form.name,
                },
            });

        setSuccessMessage('Course created successfully!');
        console.log('Course created:', response.data);
        } catch (error) {
        console.error('Course creation failed:', error);
        setErrorMessage('Error creating course. Please try again.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className={css.course}>
            <h2></h2>
            
            <div className={css.course_container}>
            <label> </label>
            <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="       Localização do Curso"
            required
            />
        </div>

            <div className={css.course_container}>
            <label></label>
            <input
            type="text"
            name="modality"
            value={form.modality}
            onChange={handleChange}
            placeholder="       Modalidade do Curso"
            required
            />
        </div>

            <div className={css.course_container}>
            <label> </label>
            <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="       Nome do Curso"
            required
            />
        </div>

        <div className={css.course_container}>
            <button onClick={handleCreateCourse} disabled={loading}>
            {loading ? 'Creating Course...' : 'Criar Curso'}
            </button>
        </div>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default CourseCreateComponent;

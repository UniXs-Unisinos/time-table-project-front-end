import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';

interface SemesterForm {
  semester: string;
}

const SemesterCreateComponent: React.FC = () => {
  const [form, setForm] = useState<SemesterForm>({ semester: ''});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCreateSemester = async () => {
    setLoading(true);
    setErrorMessage(null);  // Reset any previous error messages

    try {
      const client = await SwaggerClient({
        url: '../../swagger.json',
      });

      const response = await client.apis.semester.post_semesters({
        body: {
          name: form.semester,
        },
      });

      setSuccessMessage('Semester created successfully!');
      console.log('Semester created:', response.data);
    } catch (error) {
      console.error('Semester creation failed:', error);
      setErrorMessage('Error creating semester. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Semester</h2>

      <div>
        <label>Semester: </label>
        <input
          type="text"
          name="semester"
          value={form.semester}
          onChange={handleChange}
          placeholder="Enter semester"
          required
        />
      </div>

      <div>
        <button onClick={handleCreateSemester} disabled={loading}>
          {loading ? 'Creating Semester...' : 'Create Semester'}
        </button>
      </div>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default SemesterCreateComponent;

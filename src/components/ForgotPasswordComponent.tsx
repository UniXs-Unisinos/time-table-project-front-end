import React, { useState } from "react";
import axios from "axios";
import css from './ForgotPassword.module.css'

interface ForgotPasswordForm {
  oldPassword: string;
  newPassword: string;
}

const ForgotPasswordComponent: React.FC = () => {
  const [form, setForm] = useState<ForgotPasswordForm>({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const userId = "user-uuid"; // Replace with dynamic logic to fetch user ID

      const response = await axios.patch(
        `http://localhost:8080/users/${userId}/password`,
        {
          old_password: form.oldPassword,
          password: form.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setSuccessMessage("Password updated successfully.");
      console.log("Response:", response.data);
    } catch (error) {
      // Specify the type explicitly as AxiosError
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data?.message || "Failed to update the password.";
        setErrorMessage(errorResponse);
        console.error("Axios error:", errorResponse);
      } else {
        setErrorMessage("An unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.forgotpassword}>
      <h2></h2>
      <div className={css.forgotpassword_container}>
        <label></label>
        <input
          type="password"
          name="oldPassword"
          value={form.oldPassword}
          onChange={handleChange}
          placeholder="Antiga Senha"
          required
        />
      </div>

      <div className={css.forgotpassword_container}>
        <label></label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Nova Senha"
          required
        />
      </div>

      <div className={css.forgotpassword_container}>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Updating..." : "Confirmar"}
      </button>
      </div>
      

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default ForgotPasswordComponent;

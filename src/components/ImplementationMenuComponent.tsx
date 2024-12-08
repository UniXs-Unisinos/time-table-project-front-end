import React from "react";
import { useNavigate } from "react-router-dom";
import css from './ImplementationMenu.module.css'

const ImplementationMenuComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <div className={css.menu}>
      <h2></h2>
      <div className={css.menu_container}>
        <button onClick={() => handleRedirect("/professors")}>
          Professor
        </button>
      </div>
      <div className={css.menu_container}>
        <button onClick={() => handleRedirect("/semesters")}>
          Semestre
        </button>
      </div>
      <div className={css.menu_container}>
        <button onClick={() => handleRedirect("/courses")}>
          Curso
        </button>
      </div>
      <div className={css.menu_container}>
        <button onClick={() => handleRedirect("/disciplines")}>
          Disciplina
        </button>
      </div>
    </div>
  );
};

export default ImplementationMenuComponent;

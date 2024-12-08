import { Outlet } from 'react-router-dom';
import logo from './images/vertical-logo-unisinos-2024-transparente.png';
import css from './App.module.css';

function App() {
  

  return (
    <div className={css.app}>
      <div style={{display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}
      >
      <img src={logo} alt="Unisinos"style={{width: '45%', height: '45%'}} />
      </div>
      <Outlet/>
    </div>
    
  );
}

export default App

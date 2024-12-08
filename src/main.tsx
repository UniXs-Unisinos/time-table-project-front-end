import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'

//Pages
import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import CreateUser from './routes/CreateUser.tsx'
import CreateProfessor from './routes/CreateProfessor.tsx'
import CreateCourse from './routes/CreateCourse.tsx'
import CreateSemester from './routes/CreateSemester.tsx'
import ForgotPassword from './routes/ForgotPassword.tsx'
import CreateDiscipline from './routes/CreateDiscipline.tsx'
import CreateAvailability from './routes/CreateAvailability.tsx'
import ImplementationMenu from './routes/ImplementationMenu.tsx'
import CreateParametrization from './routes/CreateParametrization.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[ //configura pagina por pagina
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/users",
        element: <CreateUser />,
      },
      {
        path: "/professors",
        element: <CreateProfessor/>,
      },
      {
        path: "/courses",
        element: <CreateCourse/>,
      },
      {
        path:"/semesters",
        element: <CreateSemester/>,
      },
      {
        path:"/forgotpassword",
        element: <ForgotPassword/>
      },
      {
        path:"/menu",
        element: <ImplementationMenu/>
      },
      {
        path:"/disciplines",
        element:<CreateDiscipline/>
      },
      {
        path:"/availabilities",
        element:<CreateAvailability/>
      },
      {
        path:"/parametrizations",
        element:<CreateParametrization/>
      }
     ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router ={router} />
  </React.StrictMode>,
)

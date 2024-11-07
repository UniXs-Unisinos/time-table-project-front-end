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
        path: "/create-user",
        element: <CreateUser />,
      },
      {
        path: "/create-professor",
        element: <CreateProfessor/>,
      },
      {
        path: "/create-course",
        element: <CreateCourse/>,
      },
      {
        path:"/create-semester",
        element: <CreateSemester/>,
      },
     ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router ={router} />
  </React.StrictMode>,
)

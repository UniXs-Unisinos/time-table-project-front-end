import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'

//Pages
import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import CreateUser from './routes/CreateUser.tsx'
import UserListComponent from './components/UserListComponen.tsx'

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
        path: "/users/list-all",
        element: <UserListComponent/>,
      }
     ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router ={router} />
  </React.StrictMode>,
)

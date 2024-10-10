import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'

//Pages
import Home from './routes/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[ //configura pagina por pagina
      {
        path: "/",
        element: <Home />,
      }
     ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router ={router} />
  </React.StrictMode>,
)

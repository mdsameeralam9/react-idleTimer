import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    }
  ])

  return (
    <RouterProvider router={routes} />
  )
}

export default App

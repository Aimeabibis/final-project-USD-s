
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Activities } from './pages/Activities'
import { Register } from './pages/Register'
import { Users } from './pages/Users'
import { ProtectedRoute } from './core/ProtectedRouter'

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={
            // Route protégée du Dashboard
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
          <Route path="/login" element={<Login />} />
          <Route path="/activities" element={<ProtectedRoute>
            <Activities />
          </ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<ProtectedRoute>
            <Users />
          </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ViewNotes from './pages/ViewNotes'
import CreateNotes from './pages/CreateNotes'
import ProtectedRoute from './components/ProtectedRoute'


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}


function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          // this is done so that no one can access the home link without having authenticated first.
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<RegisterAndLogout />} />

        <Route path="/viewNotes" element={
          <ProtectedRoute>
            <ViewNotes />
          </ProtectedRoute>} />

        <Route path="/createNotes" element={
          <ProtectedRoute>
            <CreateNotes />
          </ProtectedRoute>} />

        <Route path="/logout" element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

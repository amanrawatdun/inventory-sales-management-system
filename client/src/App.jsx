
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Layout from './layout/Layout'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Reports from './pages/Reports'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadUserFromStorage } from './features/auth/authSlice'
import ForgotPassword from './pages/ForgotPassword'
import UpdateProfile from './pages/updateProfile'

function App() {

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loadUserFromStorage());
    
  },[dispatch])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
            }>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/sales" element={<Sales/>}/>
            <Route path="/reports" element={<Reports/>} />
            <Route path="/updateprofile" element={<UpdateProfile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

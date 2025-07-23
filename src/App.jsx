import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute.jsx'
// import Dashboard from './pages/testDashboard.jsx'
import { useAuth } from './context/Auth.jsx'
import Register from './pages/auth/register.jsx'
import Login from './pages/auth/login.jsx'
import { Suspense, lazy } from "react";
import Spinner from './components/loader.jsx'

const Dashboard = lazy(()=>import('./pages/testDashboard.jsx'))

function App() {
  const {isAuth} = useAuth();
  const navigate = useNavigate(); 
    useEffect(()=>{

      if(isAuth)
      {
        navigate('/dashboard')
      }
    }, [isAuth, navigate]);
    
    return (
      <>
        <Suspense fallback={<Spinner/>}>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path='/' element={<Register/>}/>
          {/* protect routes */}
          <Route element= {<PrivateRoute/>}>
            <Route path="/dashboard"  element={<Dashboard/>} />
          </Route>
          {/* 404 Page */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
        </Suspense>
      </>
    )
  }

  export default App

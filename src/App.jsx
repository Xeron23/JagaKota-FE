import { useEffect} from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute.jsx'
import { useAuth } from './context/Auth.jsx'
import Register from './pages/auth/register.jsx'
import Login from './pages/auth/login.jsx'
import { Suspense, lazy } from "react";
import Spinner from './components/loader.jsx'
import UploadForm from './pages/laporan.jsx'
import AdminAccess from './utils/AdminRouteAccess.jsx'
import AdminDashboard from './pages/admin/testAdminDashboard.jsx'
import { NotFound } from './pages/notFound.jsx'
import Profile from './pages/profile.jsx'
import Article from './pages/article.jsx'
import LogProcess from './pages/logProcess.jsx'
import LeaderBoard from './pages/leaderBoard.jsx'

const Dashboard = lazy(()=>import('./pages/testDashboard.jsx'))

function App() {
  const {isAuth} = useAuth();
  const navigate = useNavigate(); 
  const location = useLocation();

useEffect(() => {
  if (isAuth && (location.pathname === '/' || location.pathname === '/login')) {
    navigate('/dashboard');
  }
}, [isAuth, navigate, location.pathname]);
    
    return (
        <Suspense fallback={<Spinner/>}>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>

          {/* protect routes */}
          <Route path="/dashboard"  element={<Dashboard/>} />
          <Route path="/profile"  element={<Profile/>} />
          <Route path="/article"  element={<Article/>} />
          <Route path="/log"  element={<LogProcess/>} />
          <Route path="/leader-board"  element={<LeaderBoard/>} />
            <Route path="/laporan" element={<UploadForm/>} />

          <Route element= {<PrivateRoute/>}>

            {/* admin routes */}
            <Route element= {<AdminAccess/>}>
              <Route path="/admin" element={<AdminDashboard/>} />
            </Route>
          </Route>
          {/* 404 Page */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </Suspense>
    )
  }

  export default App

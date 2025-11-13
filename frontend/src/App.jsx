import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async() => {
      const token = localStorage.getItem("token");

      if(token){
        try {
          const res =  await axios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch(err) {
          localStorage.removeItem("token");

          console.log(err)
        }
      };
    };
      fetchUser();
        
  }, []);

  return (
      <div>
        <Routes>
          <Route path = "signup" element={<SignUp />}/>
          <Route path = "login" element={<Login setUser={setUser}/>}/>
          <Route path = "/" element={user ? <Dashboard user={user} /> : <Navigate to = '/login'/>}/>
        </Routes>
      </div>
  )
}

export default App

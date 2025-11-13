import { Link, useNavigate } from 'react-router'
import { useState } from 'react';
import axios from 'axios';

function Login ({setUser})  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => { 
    try {
      const response = await axios.post('/api/users/login', {
        email: email,
        password: password,
      });
      console.log(response);

      localStorage.setItem('token', response.data.token);
      setUser(response.data.user)
      navigate('/');
    } catch(err){

      console.log(err)
    }
    
  }

  return (
    <div className='auth-wrapper'>
      <form onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <div>
          <h3 className="signup-greet">Hello, Welcome Back!</h3>
        </div>

        <div className='form-container'>
          <div className='form-group'>
            <label className="form-label">Email*</label> 
            <input 
              className='form-input'
              type="text" 
              value={email} 
              placeholder='Enter Email'
              onChange={(e) => 
                setEmail(e.target.value)
              }
              autoComplete='off' 
              required
            />
          </div>

          <div className='form-group'>
            <label className="form-label">Password*</label>
            <input 
              className='form-input'
              type="password" 
              value={password} 
              placeholder='Enter Password'
              onChange={(e) => 
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <div>
            <button
              className="signup-button"
              type='submit'
            >Login</button>
          </div>
          <p className="switch-text">
            Don't have an account? <Link className={"link-style"} to="/signup">Sign up.</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
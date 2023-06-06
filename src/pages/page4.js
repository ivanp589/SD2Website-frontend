import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Toolbar from './Toolbar';
import './login.css';
import './toolbar.css';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', email, password);
  };

  return (
    <div>
        <Toolbar/>
        <div className="container">
          <div className="form-box">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
              <div>
                Need an account? <Link to="/Signup">Signup</Link>
              </div>
            </form>
          </div>
        </div>
        </div>
  );
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup:', email, password);
  };

  return (
    <div>
        <Toolbar />
        <div className="container">
          <div className="form-box">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Signup</button>
              <div>
                Have an account? <Link to="/Login">Login</Link>
              </div>
            </form>
          </div>
        </div>
        </div>
  );
};

export { Login, Signup };

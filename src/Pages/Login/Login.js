import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { user, login } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  return (
    <div className='form_container'>
      {error ? <p className='error'>{error}</p> : null}
      <form onSubmit={handleSubmit} className='form'>
        <h1 className='auth_title'>Login</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className='input'
          type='email'
          placeholder='Email'
          autoComplete='email'
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className='input'
          type='password'
          placeholder='Password'
          autoComplete='current-password'
          required
        />
        <button className='button'>
          Log in
        </button>
        <p>
          <span style={{ color: '#718096' }}>New to FilmStar?</span>{' '}
          <Link to='/signup'>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import '../Login/Login.css';


const Signup = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signUp } = UserAuth();
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, displayName);
      navigate('/')
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  return (
    <>
      <div className='form_container'>
      {error ? <p className='error'>{error}</p> : null}
        <form
          onSubmit={handleSubmit}
          className='form'
        >
          <h1 className='auth_title'>Signup</h1>
          <input
            onChange={(e) => setDisplayName(e.target.value)}
            className='input'
            type='text'
            placeholder='Username'
            autoComplete='username'
            required
          />
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
            Sign up
          </button>
          <p>
            <span style={{ color: '#718096' }}>
              Already have an account?
            </span>{' '}
            <Link to='/login'>Log in</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
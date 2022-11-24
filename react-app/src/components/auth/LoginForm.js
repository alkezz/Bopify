import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }
  let errorDiv
  if (errors) {
    errorDiv = (
      <div className='errors' style={{ visibility: errors.length ? "visible" : "hidden" }}>
        <div className='icon'><i class="fa-solid fa-circle-exclamation"></i></div>
        <div>
          {errors.map((error, ind) => (
            <div id='one-error' key={ind}>{error}</div>
          ))}
        </div>
      </div>
    )
  }
  if (errors.length) {
    return (
      <div className='form-container'>
        <div id='continue'>
          To continue, log in to Bopify.
        </div>
        {
          errorDiv
        }
        <div id='demo-user-div'>
          <button id='demo-button'
            type="submit"
            onClick={() => {
              setEmail("demo@aa.io");
              setPassword("password");
            }}>
            <i id='facebook' class="fa-brands fa-facebook"></i>
            CONTINUE WITH DEMO USER
          </button>
          <br />
          <button id='marnie-button' type="submit"
            onClick={() => {
              setEmail("marnie@aa.io");
              setPassword("password");
            }}>
            <i id="apple" class="fa-brands fa-apple"></i>
            CONTINUE WITH MARNIE
          </button>
          <br />
          <button id='bobbie-button'
            type="submit"
            onClick={() => {
              setEmail("bobbie@aa.io");
              setPassword("password");
            }}>
            <i id="google" class="fa-brands fa-google"></i>
            CONTINUE WITH BOBBIE
          </button>
        </div>
        <h3><span>OR</span></h3>
        <br />
        <form onSubmit={onLogin}>
          <label htmlFor='email'>Email address or username</label>
          <div className='input-div'>
            <input
              name='email'
              type='text'
              placeholder='Email address or username'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <label htmlFor='password'>Password</label>
          <div className='input-div'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div id='login-button-container'>
            <button id='login-button' type='submit'>LOG  IN</button>
          </div>
        </form>
        <div id="no-account">
          Don't have an account?
          <div id="signup-button-container">
            <button id="signup-button" onClick={(e) => history.push("/sign-up")}>SIGN UP FOR BOPIFY</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='form-container'>
        <div id='continue'>
          To continue, log in to Bopify.
        </div>
        <div id='demo-user-div'>
          <button id='demo-button'
            type="submit"
            onClick={() => {
              setEmail("demo@aa.io");
              setPassword("password");
            }}>
            <i id='facebook' class="fa-brands fa-facebook"></i>
            CONTINUE WITH DEMO USER
          </button>
          <br />
          <button id='marnie-button'
            type="submit"
            onClick={() => {
              setEmail("marnie@aa.io");
              setPassword("password");
            }}>
            <i id="apple" class="fa-brands fa-apple"></i>
            CONTINUE WITH MARNIE
          </button>
          <br />
          <button id='bobbie-button'
            type="submit"
            onClick={() => {
              setEmail("bobbie@aa.io");
              setPassword("password");
            }}>
            <i id="google" class="fa-brands fa-google"></i>
            CONTINUE WITH BOBBIE
          </button>
        </div>
        <h3><span>OR</span></h3>
        <br />
        <form onSubmit={onLogin}>
          <label htmlFor='email'>Email address or username</label>
          <div className='input-div'>
            <input
              name='email'
              type='text'
              placeholder='Email address or username'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <label htmlFor='password'>Password</label>
          <div className='input-div'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div id='login-button-container'>
            <button id='login-button' type='submit'>LOG  IN</button>
          </div>
        </form>
        <div id="no-account">
          Don't have an account?
          <div id="signup-button-container">
            <button id="signup-button" onClick={(e) => history.push("/sign-up")}>SIGN UP FOR BOPIFY</button>
          </div>
        </div>
      </div>
    )
  }
};

export default LoginForm;

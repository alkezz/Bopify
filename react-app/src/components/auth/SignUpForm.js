import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignupForm.css"
import logo from "../../assets/black_bopify_logo-removebg-preview.png"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState("")
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  document.body.style = 'background: white';
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateRepeatedEmail = (e) => {
    setRepeatEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-container'>
      <div className='logo-container' style={{ paddingTop: "10px" }}>
        <Link to="/">
          <img id='logo-image' src={logo} />
        </Link>
      </div>
      <br />
      <div>
        <h2 style={{ fontSize: "25px" }}>Sign up for free to start listening.</h2>
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
      <div style={{ paddingBottom: "15px", fontWeight: "700", fontSize: "18px" }}>
        Sign up with your email address
      </div>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label>What's your email?</label>
        <div id="input-div">
          <input
            type='text'
            name='email'
            placeholder='Enter your email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <label>Confirm your email</label>
        <div id="input-div">
          <input
            type='text'
            name='email'
            placeholder='Enter your email again'
            onChange={updateRepeatedEmail}
            value={repeatEmail}
          ></input>
        </div>
        <label>Create a password</label>
        <div id="input-div">
          <input
            type='password'
            name='password'
            placeholder='Create a password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <label>Confirm password</label>
        <div id="input-div">
          <input
            type='password'
            name='repeat_password'
            placeholder='Enter your password again'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <label>What should we call you?</label>
        <div id="input-div">
          <input
            type='text'
            name='username'
            placeholder='Enter a profile name'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div id="signup-button-container">
          <button id="signup-submit" type='submit'>Sign Up</button>
        </div>
      </form>
      <div id="already-have-account">
        Have an account?
        &nbsp;
        <span>
          <Link id="login-link" to="/login">Log in</Link>
          .
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;

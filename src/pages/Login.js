import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import LOGO from '../assets/logo.png';
import Context from '../context/Context';
import { setTokens, setEmailStorage } from '../storage';
import './styles/login.css';

function Login() {
  const { email, setEmail, password, setPassword, btn } = useContext(Context);
  const navigate = useNavigate();

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  }

  const handleBtn = () => {
    setTokens();
    setEmailStorage(email);
    navigate('/foods');
  }

  return (
    <div className="login-page-container">
      <div className="logo-container">
        <img src={ LOGO } alt="TrybeKitchen" className="logo" />
      </div>

      <div className="input-container">
        <h2>
          Login
        </h2>

        <label htmlFor="email">
          Email
          <input
            id="email"
            value={ email }
            type="text"
            onChange={ handleEmail }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            id="password"
            value={ password }
            type="password"
            onChange={ handlePassword }
          />
        </label>

        <button
          className="btn btn-success"
          type="submit"
          disabled={ btn }
          onClick={ handleBtn }
        >
          Entrar
        </button>

      </div>

    </div>
  )
}

export default Login;
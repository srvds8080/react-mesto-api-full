import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
  const { onSubmit } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit({
      email,
      password,
    });
  }, [email, password]);
  return (
    <section className="login">
      <h3 className="login__title">Вход</h3>
      <form
        onSubmit={handleSubmit}
        className="login__form"
        noValidate
      >
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          required
          onChange={handleEmail}
          value={email}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          required
          onChange={handlePassword}
          value={password}
        />
        <button
          className="login__submit-button"
          type="submit"
          aria-label="Войти"
          value="Войти"
        >
          Войти
        </button>
      </form>
    </section>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;

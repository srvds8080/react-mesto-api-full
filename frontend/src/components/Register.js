import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Register = (props) => {
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
      <h3 className="login__title">Регистрация</h3>
      <form
        className="login__form"
        noValidate
        onSubmit={handleSubmit}
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
          Зарегистрироваться
        </button>
        <p className="login__subtitle">
          Уже зарегистрированы?
          <Link to="/sign-in" className="login__link-sign-in">
            Войти
          </Link>
        </p>

      </form>
    </section>
  );
};

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Register;

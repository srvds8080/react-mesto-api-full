import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
  const { onSubmit } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleValidate = useCallback((e) => {
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.validity.valid ? '' : e.target.validationMessage,
    }));
  }, [errors]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    if (e.target.name === 'email') {
      setEmail(value);
      handleValidate(e);
    } else {
      setPassword(value);
      handleValidate(e);
    }
  };
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit({
      email,
      password,
    });
  }, [email, password]);
    // check form on errors
  useEffect(() => {
    if (!Object.values(errors).every((key) => key === '')) {
      return setIsFormValid(false);
    }
    return setIsFormValid(true);
  }, [handleOnChange]);
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
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleOnChange}
          value={email || ''}
        />
        <span
          className="popup__form-error"
          id="popup-input_type_description-error"
        >
          {errors.email}
        </span>
        <input
          className="login__input"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          onChange={handleOnChange}
          value={password || ''}
        />
        <span
          className="popup__form-error"
          id="popup-input_type_description-error"
        >
          {errors.password}
        </span>
        <button
          className="login__submit-button"
          type="submit"
          aria-label="Войти"
          value="Войти"
          disabled={!isFormValid}
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

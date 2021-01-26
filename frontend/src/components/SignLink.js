import React, { useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignLink = ({ onSign, userEmail }) => {
  const location = useLocation();
  let signTitle = 'Выйти';
  let path = '/';
  if (location.pathname === '/sign-up') {
    signTitle = 'Войти';
    path = '/sign-in';
  } else if (location.pathname === '/sign-in') {
    signTitle = 'Регистрация';
    path = '/sign-up';
  }
  const handleSign = useCallback(() => {
    onSign(path);
  }, [onSign, path]);

  return (
    <div className="signLink">
      <span className="signLink__email">{userEmail}</span>
      <Link to={path} onClick={handleSign} className="signLink__link">
        {signTitle}
      </Link>
    </div>
  );
};

SignLink.propTypes = {
  userEmail: PropTypes.string.isRequired,
  onSign: PropTypes.func.isRequired,
};

export default SignLink;

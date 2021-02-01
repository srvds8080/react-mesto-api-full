import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Successfull } from '../images/successfull.svg';
import { ReactComponent as Falled } from '../images/falled.svg';

function InfoTooltip({
  isOpen,
  isRegister,
  onClose,
  isSuccess,
}) {
  const getTitle = () => {
    if (isSuccess) {
      return isRegister
        ? 'вы успешно зарегистрированы'
        : 'вы успешно авторизованы';
    }
    return 'Что то пошло  не так';
  };

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
          aria-label="Закрыть"
        />
        {isRegister ? <Successfull className="popup__iconTooltip" /> : <Falled className="popup__iconTooltip" />}
        <h2 className="popup__message">
          {
            getTitle()
          }
        </h2>
      </div>
    </div>
  );
}

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isRegister: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoTooltip;

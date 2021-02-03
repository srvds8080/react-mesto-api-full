import React from 'react';
import PropTypes from 'prop-types';

function PopupWithForm({
  title,
  name,
  buttonTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
          aria-label="Закрыть"
        />
        <h2 className="popup__title">{ title }</h2>
        <form
          className="popup__form"
          onSubmit={onSubmit}
          noValidate
        >
          { children }
          {isFormValid
            ? <button className="popup__form-btn" type="submit">{buttonTitle}</button>
            : <button className="popup__form-btn" type="submit" disabled>{buttonTitle}</button>}
        </form>
      </div>
    </div>
  );
}
PopupWithForm.defaultProps = {
  isFormValid: false,
};
PopupWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isFormValid: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PopupWithForm;

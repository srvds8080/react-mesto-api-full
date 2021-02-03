import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../context/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [isOpen]);

  const handleValidate = useCallback((e) => {
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.validity.valid ? '' : e.target.validationMessage,
    }));
  }, [errors]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    if (e.target.name === 'userName') {
      setName(value);
      handleValidate(e);
    } else {
      setAbout(value);
      handleValidate(e);
    }
  };

  const handleOnSubmit = useCallback((e) => {
    e.preventDefault();
    onUpdateUser({ name, about });
  }, [name, about]);

  const handleOnClose = useCallback(() => {
    setErrors((prevState) => ({
      ...prevState,
      userName: '',
      userAbout: '',
    }));
    onClose();
  }, []);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={handleOnClose}
      onSubmit={handleOnSubmit}
    >
      <>
        <label htmlFor="popup-input_type_name" className="popup__label">
          <input
            type="text"
            name="userName"
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            autoComplete="off"
            value={name || ''}
            onChange={handleOnChange}
          />
          <span
            className="popup__form-error"
            id="popup-input_type_name-error"
          >
            {errors.userName}
          </span>
        </label>
        <label htmlFor="popup-input_type_description" className="popup__label">
          <input
            type="text"
            name="userAbout"
            className="popup__input popup__input_type_about"
            placeholder="Профессия"
            minLength="2"
            maxLength="200"
            required
            autoComplete="off"
            value={about || ''}
            onChange={handleOnChange}
          />
          <span
            className="popup__form-error"
            id="popup-input_type_description-error"
          >
            {errors.userAbout}
          </span>
        </label>
      </>
    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

export default EditProfilePopup;

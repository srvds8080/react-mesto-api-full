import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../context/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const handleValidate = useCallback((e) => {
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.validity.valid ? '' : e.target.validationMessage,
    }));
  }, [errors]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    if (e.target.name === 'place') {
      setPlace(value);
      handleValidate(e);
    } else {
      setUrl(value);
      handleValidate(e);
    }
  };

  const handleOnClose = useCallback(() => {
    setErrors((prevState) => ({
      ...prevState,
      place: '',
      url: '',
    }));
    onClose();
  }, []);

  const handleOnSubmit = useCallback((e) => {
    e.preventDefault();
    onAddPlace({ name: place, link: url });
  }, [place, url]);

  useEffect(() => {
    setPlace(currentUser.name);
    setUrl(currentUser.avatar);
    setIsFormValid(false);
  }, [isOpen]);

  // check form on errors
  useEffect(() => {
    if (!Object.values(errors).every((key) => key === '')) {
      return setIsFormValid(false);
    }
    return setIsFormValid(true);
  }, [isOpen, handleOnChange]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonTitle="Добавить"
      isOpen={isOpen}
      onClose={handleOnClose}
      onSubmit={handleOnSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="popup__input_type_place" className="popup__label">
        <input
          onChange={handleOnChange}
          value={place || ''}
          type="text"
          name="place"
          className="popup__input popup__input_type_place"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
        />
        <span
          className="popup__form-error"
          id="popup-input_type_place-error"
        >
          {errors.place}
        </span>
      </label>
      <label htmlFor="popup-input_type_url" className="popup__label">
        <input
          onChange={handleOnChange}
          value={url || ''}
          type="url"
          name="url"
          className="popup__input popup__input_type_destination"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
        />
        <span
          className="popup__form-error"
          id="popup-input_type_url-error"
        >
          {errors.url}
        </span>
      </label>
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
};

export default EditAvatarPopup;

import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../context/CurrentUserContext';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const [avatarLink, setAvatarLink] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const handleValidate = useCallback((e) => {
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.validity.valid ? '' : e.target.validationMessage,
    }));
  }, [errors, isOpen]);

  const handleOnChange = (e) => {
    handleValidate(e);
    setAvatarLink(e.target.value);
  };
  const handleOnClose = useCallback(() => {
    setErrors((prevState) => ({
      ...prevState,
      avatar: '',
    }));
    onClose();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(avatarLink);
  };
  // check form on errors
  useEffect(() => {
    if (!Object.values(errors).every((key) => key === '')) {
      return setIsFormValid(false);
    }
    return setIsFormValid(true);
  }, [isOpen, handleOnChange]);
  useEffect(() => {
    setAvatarLink(currentUser.avatar);
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={handleOnClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="popup-input_type_avatar" className="popup__label">
        <input
          type="url"
          name="avatar"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на изображение"
          required
          autoComplete="off"
          value={avatarLink || ''}
          onChange={handleOnChange}
        />
        <span
          className="popup__form-error"
          id="popup-input_type_avatar-error"
        >
          {errors.avatar}
        </span>
      </label>
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateAvatar: PropTypes.func.isRequired,
};

export default EditAvatarPopup;

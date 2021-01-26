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
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }, [name, description]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label htmlFor="popup-input_type_name" className="popup__label">
          <input
            type="text"
            name="popup-input_type_name"
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            autoComplete="off"
            value={name || ''}
            onChange={handleName}
          />
          <span className="popup__form-error" id="popup-input_type_name-error" />
        </label>
        <label htmlFor="popup-input_type_description" className="popup__label">
          <input
            type="text"
            name="popup-input_type_description"
            className="popup__input popup__input_type_about"
            placeholder="Профессия"
            minLength="2"
            maxLength="200"
            required
            autoComplete="off"
            value={description || ''}
            onChange={handleDescription}
          />
          <span
            className="popup__form-error"
            id="popup-input_type_description-error"
          />
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

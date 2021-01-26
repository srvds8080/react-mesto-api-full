import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const inputElement = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(inputElement.current.value);
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="popup-input_type_avatar" className="popup__label">
        <input
          ref={inputElement}
          type="url"
          name="popup-input_type_avatar"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на изображение"
          required
          autoComplete="off"
        />
        <span
          className="popup__form-error"
          id="popup-input_type_avatar-error"
        />
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

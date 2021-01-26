import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name, link });
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLink = (e) => {
    setLink(e.target.value);
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonTitle="Добавить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="popup__input_type_place" className="popup__label">
        <input
          onChange={handleName}
          value={name}
          type="text"
          name="popup-input_type_place"
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
        />
      </label>
      <label htmlFor="popup-input_type_url" className="popup__label">
        <input
          onChange={handleLink}
          value={link}
          type="url"
          name="popup-input_type_url"
          className="popup__input popup__input_type_destination"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
        />
        <span
          className="popup__form-error"
          id="popup-input_type_url-error"
        />
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

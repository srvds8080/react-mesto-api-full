import React from 'react';
import PropTypes from 'prop-types';

function ImagePopup({ selectedCard = {}, isOpen = false, onClose }) {
  return (
    <div className={`popup popup_preview ${isOpen && 'popup_opened'}`}>
      <figure className="popup__img-box">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
          aria-label="Закрыть"
        />
        <img
          className="popup__img-preview"
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <figcaption
          className="popup__preview-description"
        >
          { selectedCard.name }
        </figcaption>
      </figure>
    </div>
  );
}

ImagePopup.propTypes = {
  selectedCard: PropTypes.shape({
    link: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagePopup;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../context/CurrentUserContext';

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    _id,
    name,
    link,
    owner,
    likes,
  } = card;
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `card-box__delete ${isOwn ? 'card-box__delete_is-visible' : 'card-box__delete_is-hidden'}`
  );
  const cardLikeButtonClassName = `card-box__button ${isLiked && 'card-box_button-checked'}`;

  const handleCardClick = () => {
    onCardClick({ link, name });
  };

  return (
    <li className="card-box elements__item">
      <button
        className={cardDeleteButtonClassName}
        onClick={() => onCardDelete(_id)}
        type="button"
        aria-label="Удалить"
      />
      <img
        src={link}
        alt={name}
        className="card-box__img"
        onClick={handleCardClick}
        aria-hidden
      />
      <div className="card-box__description">
        <h2 className="card-box__text">{ name }</h2>
        <button
          type="button"
          onClick={() => onCardLike({ likes, owner, _id })}
          className={cardLikeButtonClassName}
        >
          <span className="card-box__button_likes">{ likes.length }</span>
        </button>
      </div>
    </li>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    owner: PropTypes.objectOf.isRequired,
    likes: PropTypes.arrayOf.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default Card;

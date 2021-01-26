import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import CurrentUserContext from '../context/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar_container"
          onClick={onEditAvatar}
        >
          <div className="profile__avatar_overlay" />
          <img
            src={avatar}
            alt="Аватар профиля"
            className="profile__avatar"
          />
        </button>
        <div
          type="button"
          className="profile__info"
        >
          <div className="profile__info-name-box">
            <h1 className="profile__info-name">{ name }</h1>
            <button
              type="button"
              className="profile__edit-btn"
              onClick={onEditProfile}
              aria-label="Редактировать профиль"
            />
          </div>
          <p className="profile__about">{ about }</p>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={onAddPlace}
          aria-label="Добавить место"
        />
      </section>
      <ul className="elements">
        {
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={(likedCard) => onCardLike(likedCard)}
              onCardDelete={onCardDelete}
            />
          ))
        }
      </ul>
    </main>
  );
}

Main.propTypes = {
  onEditProfile: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.any).isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default Main;

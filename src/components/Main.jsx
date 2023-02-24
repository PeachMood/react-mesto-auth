import React, { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Card } from './Card';

export const Main = ({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser?.avatar})` }} onClick={onEditAvatar} aria-label="Обновить аватар"></div>
          <div className="profile__info">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button className="profile__edit button" type="button" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
            </div>
            <p className="profile__about">{currentUser?.about}</p>
          </div>
        </div>
        <button className="profile__add button" type="button" onClick={onAddPlace} aria-label="Создать карточку"></button>
      </section>
      <section className="cards" aria-label="Карточки">
        <ul className="cards__container">
          {cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)}
        </ul>
      </section>
    </main>
  );
};

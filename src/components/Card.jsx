import React, { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(user => user._id === currentUser._id);

  const buttonLikeClassName = `card__like ${isLiked && 'card__like_active'} button`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleCardDelete = () => {
    onCardDelete(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li className="card__element">
      <figure className="card">
        {isOwn && <button className="card__delete button" type="button" aria-label="Удалить карточку" onClick={handleCardDelete} />}
        <div className="card__square">
          <img className="card__image" src={card?.link} alt={card?.name} onClick={handleCardClick} />
        </div>
        <figcaption className="card__caption">
          <h2 className="card__text">{card?.name}</h2>
          <div className="card__wrapper">
            <button className={buttonLikeClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick} />
            <span className="card__counter">{card?.likes.length}</span>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

import React, { useState, useEffect } from 'react';

import { Main } from './Main';
import { PopupEditAvatar } from './PopupEditAvatar';
import { PopupEditProfile } from './PopupEditProfile';
import { PopupAddPlace } from './PopupAddPlace';
import { PopupConfirm } from './PopupConfirm';
import { ImagePopup } from './ImagePopup';
import { api } from '../utils/api';
import { useCurrentUserContext } from '../contexts/user';

// Логика и разметка контента с карточками и профилем вынесена в отедльную компоненту для удобства
export const Home = () => {
  // В дальнейшем хотелось бы реализовать контекст и для карточек
  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [trashedCard, setTrashedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser, setCurrentUser, isLoggedIn } = useCurrentUserContext();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(user => ({ ...user, ...userInfo }));
          setCards(initialCards);
        })
        .catch(error => console.log(`Ошибка: ${error}`));
    }
  }, [isLoggedIn, setCurrentUser]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleClosePopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setTrashedCard(null);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.toggleLike(card._id, isLiked)
      .then(likedCard => {
        const updatedCards = cards.map(other => other._id === likedCard._id ? likedCard : other);
        setCards(updatedCards);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDelete = (card) => {
    setTrashedCard(card);
  };

  const handleUpdateProfile = (profile) => {
    setIsLoading(true);
    api.editUserInfo(profile)
      .then(updatedUser => {
        setCurrentUser(user => ({ ...user, ...updatedUser }));
        setIsEditProfilePopupOpen(false);
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api.editUserAvatar(avatar)
      .then(updatedUser => {
        setCurrentUser(user => ({ ...user, ...updatedUser }));
        setIsEditAvatarPopupOpen(false);
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlace = (card) => {
    setIsLoading(true);
    api.addCard(card)
      .then(addedCard => {
        setCards([addedCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  };

  const handleConfirmClick = (card) => {
    setIsLoading(true);
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => {
          const updatedCards = cards.filter(other => card._id !== other._id);
          setCards(updatedCards);
          setTrashedCard(null);
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <Main
        cards={cards}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete} />
      <PopupConfirm
        card={trashedCard}
        isLoading={isLoading}
        onClose={handleClosePopups}
        onConfirm={handleConfirmClick} />
      <PopupEditAvatar
        isOpen={isEditAvatarPopupOpen}
        isLoading={isLoading}
        onClose={handleClosePopups}
        onUpdateAvatar={handleUpdateAvatar} />
      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        isLoading={isLoading}
        onClose={handleClosePopups}
        onUpdateUser={handleUpdateProfile} />
      <PopupAddPlace
        isOpen={isAddPlacePopupOpen}
        isLoading={isLoading}
        onClose={handleClosePopups}
        onAddPlace={handleAddPlace} />
      <ImagePopup
        card={selectedCard}
        onClose={handleClosePopups} />
    </>
  );
};
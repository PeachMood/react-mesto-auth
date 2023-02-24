import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import { Header } from './Header';
import { Footer } from './Footer';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './Login';
import { Register } from './Register';
import { InfoTooltip } from './InfoTooltip';
import { Main } from './Main';
import { PopupEditAvatar } from './PopupEditAvatar';
import { PopupEditProfile } from './PopupEditProfile';
import { PopupAddPlace } from './PopupAddPlace';
import { PopupConfirm } from './PopupConfirm';
import { ImagePopup } from './ImagePopup';

export const App = () => {
  // Состояния для хранения информации, связанной с пользователем
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [cards, setCards] = useState([]);

  // Состояния для работы с popup'ами
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [trashedCard, setTrashedCard] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Callback'и для открытия и закрытия popup'ов
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
    setTooltip(null);
  };

  // Callback'и для авторизации пользователя
  const handleRegister = (data) => {
    auth.register(data)
      .then(() => {
        setTooltip({ isError: false, message: 'Вы успешно зарегистрировались!' });
        navigate('/sign-in', { replace: true });
      })
      .catch(error => {
        const status = { isError: true, message: 'Что-то пошло не так! Попробуйте ещё раз.' };
        if (error === 400) {
          status.message = 'Некорректный логин или пароль.';
        }
        setTooltip(status);
      });
  };

  const handleLogin = (data) => {
    auth.login(data)
      .then(response => {
        if (response.token) {
          setIsLoggedIn(true);
          setCurrentUser({ email: data.email });
          navigate('/', { replace: true });
        }
      })
      .catch(error => {
        const status = { isError: true };
        switch (error) {
          case 400:
            status.message = 'Неверный логин или пароль.';
            break;
          case 401:
            status.message = 'Пользователь с данным email не найден.';
            break;
          default:
            status.message = 'Что-то пошло не так! Попробуйте ещё раз.';
        }
        setTooltip(status);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCards([]);
    navigate('/sign-in', { replace: true });
  };

  // Callback'и для работы с карточками
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

  // Callback'и для обработки submit'ов форм
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

  // Проверка авторизации пользователя на этапе монтирования сайта
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then(data => {
          setIsLoggedIn(true);
          setCurrentUser(user => ({ ...user, email: data.data.email }));
          navigate('/', { replace: true });
        })
        .catch(error => console.log(`Ошибка: ${error}`));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Загрузка данных для профиля после авторизации пользователя
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(user => ({ ...user, ...userInfo }));
          setCards(initialCards);
        })
        .catch(error => console.log(`Ошибка: ${error}`));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header onSignOut={handleSignOut} />
          <Routes>
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />} >
              <Route index path="/" element={
                <Main
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete} />
              } />
            </Route>
          </Routes>
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
          <InfoTooltip tooltip={tooltip} onClose={handleClosePopups} />
          {isLoggedIn && <Footer />}
        </div>
      </div >
    </CurrentUserContext.Provider>
  );
}

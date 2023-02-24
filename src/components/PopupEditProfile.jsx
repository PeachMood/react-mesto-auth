import React, { useState, useEffect, useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupWithForm } from './PopupWithForm';

export const PopupEditProfile = ({ isOpen, isLoading, onClose, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isOpen) {
      setName(currentUser?.name);
      setAbout(currentUser?.about);
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleSubmit = () => {
    onUpdateUser({ name, about });
  };

  return (
    <PopupWithForm
      formTitle="Редактировать профиль"
      formName="profile"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="form__field">
        <input
          required
          name="name"
          className="form__input form__input_theme_light"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange} />
      </label>
      <label className="form__field">
        <input
          required
          name="about"
          className="form__input form__input_theme_light"
          placeholder="Расскажите о себе"
          minLength="2"
          maxLength="200"
          value={about || ''}
          onChange={handleAboutChange} />
      </label>
    </PopupWithForm>
  );
};

import React, { useEffect, useState } from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupAddPlace = ({ isOpen, isLoading, onClose, onAddPlace }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = () => {
    onAddPlace({ name, link });
  };

  return (
    <PopupWithForm
      formTitle="Новое место"
      formName="card"
      buttonText={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="form__field">
        <input
          required
          name="name"
          className="form__input form__input_theme_light"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange} />
      </label>
      <label className="form__field">
        <input
          required
          name="link"
          type="url"
          className="form__input form__input_theme_light"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleLinkChange} />
      </label>
    </PopupWithForm>
  );
};

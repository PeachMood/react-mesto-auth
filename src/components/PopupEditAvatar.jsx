import React, { useEffect, useRef } from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupEditAvatar = ({ isOpen, isLoading, onClose, onUpdateAvatar }) => {
  const avatar = useRef(null);

  const handleSubmit = () => {
    onUpdateAvatar({ avatar: avatar.current.value })
  };

  useEffect(() => {
    if (!isOpen) {
      avatar.current.value = null;
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      formTitle="Обновить аватар"
      formName="avatar"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="form__field">
        <input
          required
          name="avatar"
          type="url"
          className="form__input form__input_theme_light"
          placeholder="Ссылка на картинку"
          ref={avatar} />
      </label>
    </PopupWithForm>
  );
};

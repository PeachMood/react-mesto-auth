import React from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupConfirm = ({ card, isLoading, onClose, onConfirm }) => {
  const handleSumbit = () => {
    onConfirm(card);
  };

  return (
    <PopupWithForm
      formTitle="Вы уверены?"
      formName="confirm"
      buttonText={isLoading ? "Удаление..." : "Да"}
      isOpen={card}
      onClose={onClose}
      onSubmit={handleSumbit} />
  );
};

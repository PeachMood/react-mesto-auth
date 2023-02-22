import React from 'react';

export const PopupWithForm = ({ formTitle, formName, buttonText, isOpen, onClose, onSubmit, children }) => {
  const popupClassName = `popup popup_${formName} popup_background_light ${isOpen && 'popup_opened'}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className={popupClassName}>
      <div className="popup__container">
        <button className="popup__close button" type="button" onClick={onClose} aria-label="Закрыть попап"></button>
        <form name={formName} className={`form form_${formName} form_theme_light`} onSubmit={handleSubmit}>
          <h2 className="form__title form__title_theme_light">{formTitle}</h2>
          {children}
          <button className="form__submit form__submit_theme_light button" type="submit">{buttonText}</button>
        </form>
      </div>
    </section>
  );
};

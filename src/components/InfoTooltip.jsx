import React from 'react';

export const InfoTooltip = ({ tooltip, onClose }) => {
  const popupClassName = `popup popup_tooltip popup_background_light ${tooltip && 'popup_opened'}`;
  const iconClassName = `tooltip__icon ${tooltip?.isError ? 'tooltip__icon_status_error' : 'tooltip__icon_status_success'}`;

  return (
    <section className={popupClassName}>
      <div className="popup__container">
        <button className="popup__close button" type="button" onClick={onClose} aria-label="Закрыть попап"></button>
        <article className="tooltip">
          {tooltip && <div className={iconClassName}></div>}
          <h2 className="tooltip__message">{tooltip?.message}</h2>
        </article>
      </div>
    </section >
  );
};
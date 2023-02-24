import React, { useContext } from 'react';
import { Routes, Link, Route } from 'react-router-dom';

import headerLogo from '../images/headerLogo.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Header = ({ onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место" />
      <nav className="header__nav">
        <Routes>
          <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
          <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
          <Route path="/" element={
            <>
              <p className="header__email">{currentUser?.email}</p>
              <button className="header__button button" onClick={onSignOut}>Выйти</button>
            </>
          } />
        </Routes>
      </nav>
    </header>
  );
};

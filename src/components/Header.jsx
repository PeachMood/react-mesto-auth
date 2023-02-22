import React from 'react';
import { Routes, Link, Route, useNavigate } from 'react-router-dom';

import headerLogo from '../images/headerLogo.svg';
import { useCurrentUserContext } from '../contexts/user';

export const Header = () => {
  const { currentUser, setCurrentUser, setIsLoggedIn } = useCurrentUserContext();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/sign-in', { replace: true });
  };

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
              <button className="header__button button" onClick={handleSignOut}>Выйти</button>
            </>
          } />
        </Routes>
      </nav>

    </header>
  );
};

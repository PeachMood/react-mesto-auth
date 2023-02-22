import React, { createContext, useContext, useState } from 'react';

// Модуль для более удобной работы с данными пользователя. Благодаря глобальному состоянию
// данных упрощает доступ к ним и значительно уменьшает количество передаваемых callback'ов
const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};
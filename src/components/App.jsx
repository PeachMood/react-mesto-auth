import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';
import { InfoTooltip } from './InfoTooltip';
import { useCurrentUserContext } from '../contexts/user';
import { auth } from '../utils/auth';

export const App = () => {
  const { isLoggedIn, setCurrentUser, setIsLoggedIn } = useCurrentUserContext();
  const navigate = useNavigate();

  // Поскольку проверка токена должна происходить только при монтировании App,
  // массив зависимостей необходимо оставить пустым, несмотря на warning
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

  return (
    <div className="page">
      <div className="content">
        <Header />
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route element={<ProtectedRoute />} >
            <Route index path="/" element={<Home />} />
          </Route>
        </Routes>
        {!isLoggedIn && <InfoTooltip />}
        {isLoggedIn && <Footer />}
      </div>
    </div >
  );
}

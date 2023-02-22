import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCurrentUserContext } from '../contexts/user';
import { useTooltipContext } from '../contexts/tooltip';
import { auth } from '../utils/auth';

export const Login = () => {
  const [data, setData] = useState({ email: '', password: '', });
  const { setIsLoggedIn, setCurrentUser } = useCurrentUserContext();
  const { openTooltip } = useTooltipContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.login(data)
      .then(response => {
        if (response.token) {
          setIsLoggedIn(true);
          setCurrentUser({ email: data.email });
          navigate('/', { replace: true });
        }
      })
      .catch(error => {
        const tooltip = { isError: true };
        switch (error) {
          case 400:
            tooltip.message = 'Неверный логин или пароль.';
            break;
          case 401:
            tooltip.message = 'Пользователь с данным email не найден.';
            break;
          default:
            tooltip.message = 'Что-то пошло не так! Попробуйте ещё раз.';
        }
        openTooltip(tooltip);
      });
  };

  return (
    <main className="auth">
      <form className="form form_theme_dark auth__form" onSubmit={handleSubmit}>
        <h2 className="form__title form__title_theme_dark form__title_position_centered">Войти</h2>
        <label className="form__field">
          <input
            className="form__input form__input_theme_dark"
            placeholder="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            autoComplete="off"
            required />
        </label>
        <label className="form__field">
          <input
            className="form__input form__input_theme_dark"
            placeholder="Пароль"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            autoComplete="off"
            required />
        </label>
        <button className="form__submit form__submit_theme_dark auth__button button">Войти</button>
      </form>
    </main>
  );
};
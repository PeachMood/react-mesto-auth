import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTooltipContext } from '../contexts/tooltip';
import { auth } from '../utils/auth';

export const Register = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const { openTooltip } = useTooltipContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.register(data)
      .then(_ => {
        openTooltip({ isError: false, message: 'Вы успешно зарегистрировались!' });
        navigate('/sign-in', { replace: true });
      })
      .catch(error => {
        const tooltip = { isError: true, message: 'Что-то пошло не так! Попробуйте ещё раз.' };
        if (error === 400) {
          tooltip.message = 'Некорректный логин или пароль.';
        }
        openTooltip(tooltip);
      });
  };

  return (
    <main className="auth">
      <form className="form form_theme_dark auth__form" onSubmit={handleSubmit}>
        <h2 className="form__title form__title_theme_dark form__title_position_centered">Регистрация</h2>
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
        <button className="form__submit form__submit_theme_dark auth__button button">Зарегистрироваться</button>
      </form>
      <p className="auth__signup">
        Уже зарегистрированы?
        <Link className="auth__link" to="/sign-in">Войти</Link>
      </p>
    </main>
  );
};
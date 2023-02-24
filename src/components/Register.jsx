import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = ({ onRegister }) => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(data);
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
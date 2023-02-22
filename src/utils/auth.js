import { HttpApi } from './HttpApi';

// Класс, предоставляющий методы для получения данных с сервера для авторизации пользователя
class AuthApi extends HttpApi {
  constructor(options) {
    super(options.baseUrl);
  }

  register(data) {
    return this.sendRequest('signup', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  login(data) {
    return this.sendRequest('signin', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          return response;
        }
      })
  }

  checkToken(token) {
    return this.sendRequest('users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      method: 'GET',
    });
  }
}


export const auth = new AuthApi({ baseUrl: 'https://auth.nomoreparties.co' });
import { HttpApi } from './HttpApi';

// Класс, предоставляющий методы для получения данных с сервера о профиле пользователя
class Api extends HttpApi {
  constructor(options) {
    super(options.baseUrl);
    this._headers = options.headers;
  }

  sendRequest(endpoint, options) {
    options.headers = this._headers;
    return super.sendRequest(endpoint, options);
  }

  getUserInfo() {
    return this.sendRequest('users/me', { method: 'GET' });
  }

  getInitialCards() {
    return this.sendRequest('cards', { method: 'GET' });
  }

  editUserInfo(userInfo) {
    return this.sendRequest('users/me', {
      method: 'PATCH',
      body: JSON.stringify(userInfo)
    });
  }

  editUserAvatar(avatar) {
    return this.sendRequest('users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify(avatar)
    });
  }

  addCard(card) {
    return this.sendRequest('cards', {
      method: 'POST',
      body: JSON.stringify(card)
    });
  }

  deleteCard(cardId) {
    return this.sendRequest(`cards/${cardId}`, { method: 'DELETE' });
  }

  addLike(cardId) {
    return this.sendRequest(`cards/${cardId}/likes`, { method: 'PUT' });
  }

  deleteLike(cardId) {
    return this.sendRequest(`cards/${cardId}/likes`, { method: 'DELETE' });
  }

  toggleLike(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.addLike(cardId);
  }
}

// Название модуля было выбрано для соответствия требованиям
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '1ef1b3d5-edaa-4946-a8b9-3e3aa212cdf2',
    'Content-Type': 'application/json'
  }
});

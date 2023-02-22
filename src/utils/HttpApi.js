// Родительский класс для абстрагирования общей логики классов,
// реализующих конкретные методы для API запросов к серверу
export class HttpApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  }

  sendRequest(endpoint, options) {
    return fetch(`${this._baseUrl}/${endpoint}`, options)
      .then(this._checkResponse);
  }
}
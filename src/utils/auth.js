const BASE_URL = 'https://auth.nomoreparties.co'

 const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = ({email, password}) => {
    return fetch(`&{BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => checkResponse(res));
};

export const login = ({email, password}) => {
    return fetch(`&{BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => checkResponse(res));
};

const chekToken = (token) => {
    return fetch(`&{BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => checkResponse(res));
}
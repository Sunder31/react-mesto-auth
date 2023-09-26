export const BASE_URL = 'https://auth.nomoreparties.co/';

const getResData = (res) => {
    if (res.ok) {
        return res.json();
    }
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then((res) => {
        return getResData(res);
    });
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then((res) => {
        return getResData(res);
    });
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        return getResData(res);
    });
}
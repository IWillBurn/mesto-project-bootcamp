const config = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1',
    token: '57702ec3-7f19-4022-859b-b988c67df0f3',
}

const sendRequest = async (method, request, body) => {
    if (body != null) {
        body = JSON.stringify(body);
    }
    return new Promise((resolve, reject) => {
        fetch(`${config.baseUrl}${request}`, {
        method: method,
        headers: {
            authorization: config.token,
            'Content-Type': 'application/json'
        },
            body: body,
        })
        .then(async (result) => {
            const json = await result.json();
            json.status = result.status;
            resolve(json);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

export const getMe = async () => {
    return await sendRequest("GET", "/users/me", null);
}
export const patchAvatar = async (avatarUrl) => {
    return await sendRequest("PATCH", "/users/me/avatar", avatarUrl)
}
export const patchMe = async (userInfo) => {
    return await sendRequest("PATCH", "/users/me", userInfo);
}
export const getCards = async () => {
    return await sendRequest("GET", "/cards", null);
}
export const postCard = async (card) => {
    return await sendRequest("POST", "/cards", card);
}
export const deleteCard = async (cardId) => {
    return await sendRequest("DELETE", `/cards/${cardId}`, null);
}
export const putLike = async (cardId) => {
    return await sendRequest("PUT", `/cards/likes/${cardId}`, null);
}
export const deleteLike = async (cardId) => {
    return await sendRequest("DELETE", `/cards/likes/${cardId}`);
}
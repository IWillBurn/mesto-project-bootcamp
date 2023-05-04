const config = {
    baseUrl: 'exp-mipt-fbc-1',
    headers: {
        authorization: '57702ec3-7f19-4022-859b-b988c67df0f3',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
} 
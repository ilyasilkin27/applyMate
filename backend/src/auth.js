import axios from 'axios';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

export const getAuthorizationUrl = () => {
    const state = 'sdjofi0(JF)(#WF$%@#%#@^';
    return `https://hh.ru/oauth/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;
};

export const getAccessToken = async (authorizationCode) => {
    try {
        const response = await axios.post('https://api.hh.ru/token', null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                grant_type: 'authorization_code',
                client_id: clientId,
                client_secret: clientSecret,
                code: authorizationCode,
                redirect_uri: redirectUri,
            },
        });
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
        };
    } catch (error) {
        console.error('Ошибка при получении токена доступа:', error);
        return null;
    }
};

export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post('https://api.hh.ru/token', null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
            },
        });
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
        };
    } catch (error) {
        console.error('Ошибка при обновлении токена доступа:', error);
        return null;
    }
};

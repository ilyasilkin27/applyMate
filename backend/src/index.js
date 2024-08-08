import 'dotenv/config';
import express from 'express';
import { getAuthorizationUrl, getAccessToken, refreshAccessToken } from './auth.js';
import { getVacancies } from './api.js';

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get('/api/authorize', (req, res) => {
    const authorizationUrl = getAuthorizationUrl();
    res.redirect(authorizationUrl);
});

app.get('/api/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('Authorization code missing');
    }

    const tokenData = await getAccessToken(code);
    if (!tokenData) {
        return res.status(500).send('Failed to get access token');
    }

    res.json(tokenData);
});

app.get('/api/vacancies', async (req, res) => {
    const { searchTerm } = req.query;
    if (!searchTerm) {
        return res.status(400).send('Search term missing');
    }

    let tokenData = {};
    if (!tokenData.accessToken || Date.now() > tokenData.expiresIn * 1000) {
        const authorizationCode = '';
        if (!tokenData.accessToken) {
            tokenData = await getAccessToken(authorizationCode);
        } else {
            tokenData = await refreshAccessToken(tokenData.refreshToken);
        }
        if (!tokenData) {
            return res.status(500).send('Failed to get or refresh access token');
        }
    }

    try {
        const vacancies = await getVacancies(searchTerm, tokenData.accessToken);
        res.json(vacancies);
    } catch (error) {
        res.status(500).send('Failed to fetch vacancies');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

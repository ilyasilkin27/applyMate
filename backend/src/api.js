import axios from 'axios';

export const getVacancies = async (searchTerm, accessToken) => {
    try {
        const response = await axios.get('https://api.hh.ru/vacancies', {
            params: {
                text: searchTerm,
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.items;
    } catch (error) {
        console.error('Ошибка при получении списка вакансий:', error);
        return [];
    }
};

export const applyToVacancy = async (vacancyId, coverLetter, accessToken) => {
    try {
        const response = await axios.post(`https://api.hh.ru/vacancies/${vacancyId}/apply`, {
            cover_letter: coverLetter,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log('Отклик успешно отправлен:', response.data);
    } catch (error) {
        console.error('Ошибка при отправке отклика:', error);
    }
};

import 'dotenv/config';
import { getAccessToken, getVacancies, applyToVacancy } from './api.js';

const autoApply = async (searchTerm, coverLetter) => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        console.error('Не удалось получить токен доступа');
        return;
    }

    const vacancies = await getVacancies(searchTerm, accessToken);
    console.log(vacancies);
    // for (const vacancy of vacancies) {
    //     await applyToVacancy(vacancy.id, coverLetter, accessToken);
    // }
};

const searchTerm = 'фронтенд';
const coverLetter = `
Здравствуйте!

Меня зовут Илья, и я заинтересован в вашей вакансии.

Мой основной стек технологий: JavaScript, TypeScript, React.

До недавнего времени я работал ментором преподавателей по JavaScript в Хекслет колледже. Я прошел обучение на курсах Хекслет по фронтенду и DevOps, а также активно участвовал в open-source проектах. У меня также есть опыт работы с Ansible и другими DevOps-инструментами. Сейчас я активно ищу новые профессиональные возможности для роста и развития.

Среди моих проектов:
- Аналог Slack-чата на React.
- Приложение на TypeScript и React для отображения списка постов на странице.
- Приложение для автоматизированной регистрации новых студентов с использованием API AmoCRM и Keycloak.
- Консольное приложение для парсинга расписания и подсчета количества часов у преподавателей (JavaScript и сторонние библиотеки).
- Приложение RSS-агрегатор с деплоем на Vercel, для отработки навыков работы с DOM, webpack, Bootstrap и AJAX.
- Консольное приложение для вычисления различий между JSON/YML/YAML документами, с акцентом на парсинг и форматирование данных, проектирование архитектуры приложений, работу с деревьями и написание unit-тестов.

Подробную информацию обо мне и моих проектах вы можете найти в моем портфолио и резюме: 

- [портфолио](https://ilya-silkin-portfolio.vercel.app/)
- [резюме](https://hh.ru/resume/ffc04663ff0ba537a80039ed1f6e556d477265)

Спасибо за ваше время! Буду рад продолжить общение с вами.

С уважением,
Илья

Мои контакты:
- [Email](ilyasilkin27@gmail.com)
- [Telegram](https://t.me/ilyasilkin27)
- [GitHub](https://github.com/ilyasilkin27)
`;

autoApply(searchTerm, coverLetter);

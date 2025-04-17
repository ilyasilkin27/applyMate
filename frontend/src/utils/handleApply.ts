import ky from 'ky';

interface Alert {
  variant: 'success' | 'danger' | 'warning' | 'info';
  message: string;
}

type SetAlert = (alert: Alert) => void;

export const applyVacancy = async (
  resumeId: string,
  vacancyId: string,
  coverLetter: string,
  setCustomAlert: SetAlert
): Promise<void> => {
  if (!resumeId || !vacancyId) return;

  try {
    const accessToken = sessionStorage.getItem('access_token');
    
    const data = await ky
      .post(`https://applymate-vacancies-service.onrender.com/api/vacancies/${resumeId}/apply_vacancy`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        json: {
          vacancyId,
          coverLetter,
        }
      })
      .json<{ message: string }>();

    setCustomAlert({
      variant: 'success',
      message: data.message
    });
  } catch (err) {
    console.error('Error applying to vacancy:', err);
    if (err instanceof ky.HTTPError) {
      const errorData = await err.response.json();
      const message = errorData.description === 'Daily negotiations limit is exceeded'
        ? 'Daily limit of 200 negotiations has already been used.'
        : `Error: ${errorData.description || 'An unknown error occurred'}`;
      setCustomAlert({
        variant: 'danger',
        message
      });
    } else {
      setCustomAlert({
        variant: 'danger',
        message: 'An error occurred while applying to the vacancy.'
      });
    }
  }
};

export const applyAllVacancies = async (
  resumeId: string,
  vacancyIds: string[],
  coverLetter: string,
  setCustomAlert: SetAlert
): Promise<void> => {
  if (!resumeId || !vacancyIds || vacancyIds.length === 0) return;

  try {
    const accessToken = sessionStorage.getItem('access_token');
    
    const data = await ky
      .post(`https://applymate-vacancies-service.onrender.com/api/vacancies/${resumeId}/apply_all_vacancies`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        json: {
          vacancies: vacancyIds.map((id) => ({ id })),
          coverLetter,
        }
      })
      .json<{ message: string }>();

    setCustomAlert({
      variant: 'success',
      message: data.message
    });
  } catch (err) {
    console.error('Error applying to all vacancies:', err);
    if (err instanceof ky.HTTPError) {
      const errorData = await err.response.json();
      const message = errorData.description === 'Daily negotiations limit is exceeded'
        ? 'Daily limit of 200 negotiations has already been used.'
        : `Error: ${errorData.description || 'An unknown error occurred'}`;
      setCustomAlert({
        variant: 'danger',
        message
      });
    } else {
      setCustomAlert({
        variant: 'danger',
        message: 'An error occurred while applying to all vacancies.'
      });
    }
  }
}; 
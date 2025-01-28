export const applyVacancy = async (
  resumeId,
  vacancyId,
  coverLetter,
  setCustomAlert
) => {
  if (!resumeId || !vacancyId) return;

  try {
    const response = await fetch(
      `https://applymate-vacancies-service.onrender.com/api/vacancies/${resumeId}/apply_vacancy`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vacancyId,
          coverLetter,
        }),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const message =
        errorData.description === 'Daily negotiations limit is exceeded'
          ? 'Daily limit of 200 negotiations has already been used.'
          : `Error: ${errorData.description || 'An unknown error occurred'}`;
      setCustomAlert(message);
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (err) {
    console.error('Error applying to vacancy:', err);
    setCustomAlert('An error occurred while applying to the vacancy.');
  }
};

export const applyAllVacancies = async (
  resumeId,
  vacancyIds,
  coverLetter,
  setCustomAlert
) => {
  if (!resumeId || !vacancyIds || vacancyIds.length === 0) return;

  try {
    const response = await fetch(
      `https://applymate-vacancies-service.onrender.com/api/vacancies/${resumeId}/apply_all_vacancies`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vacancies: vacancyIds.map((id) => ({ id })),
          coverLetter,
        }),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const message =
        errorData.description === 'Daily negotiations limit is exceeded'
          ? 'Daily limit of 200 negotiations has already been used.'
          : `Error: ${errorData.description || 'An unknown error occurred'}`;
      setCustomAlert(message);
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (err) {
    console.error('Error applying to all vacancies:', err);
    setCustomAlert('An error occurred while applying to all vacancies.');
  }
};

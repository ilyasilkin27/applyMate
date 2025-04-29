export const applyVacancy = async (
  resumeId: string,
  vacancyId: string,
  coverLetter: string,
  setCustomAlert: (msg: string) => void
) => {
  if (!resumeId || !vacancyId) return

  try {
    const accessToken = sessionStorage.getItem('access_token')

    const response = await fetch(
      `https://applymate-vacancies-service.onrender.com/api/vacancies/${resumeId}/apply_vacancy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          vacancyId,
          coverLetter,
        }),
      }
    )

    if (!response.ok) {
      const errorData: { description?: string } = await response.json()
      const message =
        errorData.description === 'Daily negotiations limit is exceeded'
          ? 'Daily limit of 200 negotiations has already been used.'
          : `Error: ${errorData.description || 'An unknown error occurred'}`
      setCustomAlert(message)
    } else {
      const data: { message: string } = await response.json()
      alert(data.message)
    }
  } catch (err) {
    console.error('Error applying to vacancy:', err)
    setCustomAlert('An error occurred while applying to the vacancy.')
  }
}

export const applyAllVacancies = async (
  resumeId: string,
  vacancyIds: string[],
  coverLetter: string,
  setCustomAlert: (msg: string) => void
) => {
  if (!resumeId || !vacancyIds || vacancyIds.length === 0) return

  try {
    const accessToken = sessionStorage.getItem('access_token')

    const response = await fetch(
      `https://applymate-vacancies-service.onrender.com/api/vacancies/${resumeId}/apply_all_vacancies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          vacancies: vacancyIds.map((id) => ({ id })),
          coverLetter,
        }),
      }
    )

    if (!response.ok) {
      const errorData: { description?: string } = await response.json()
      const message =
        errorData.description === 'Daily negotiations limit is exceeded'
          ? 'Daily limit of 200 negotiations has already been used.'
          : `Error: ${errorData.description || 'An unknown error occurred'}`
      setCustomAlert(message)
    } else {
      const data: { message: string } = await response.json()
      alert(data.message)
    }
  } catch (err) {
    console.error('Error applying to all vacancies:', err)
    setCustomAlert('An error occurred while applying to all vacancies.')
  }
}

import type { Context } from 'elysia'
import ky from 'ky'
import {
  getAccessToken,
  isAccessTokenValid,
  buildHeaders,
} from '../utils/apiUtils'

interface VacancyInput {
  id: string
}

const buildFormData = (
  resumeId: string,
  vacancyId: string,
  coverLetter?: string
) => {
  const form = new URLSearchParams()
  form.append('resume_id', resumeId)
  form.append('vacancy_id', vacancyId)
  if (coverLetter) form.append('message', coverLetter)
  return form
}

const applyToVacancy = async (
  token: string,
  resumeId: string,
  vacancyId: string,
  coverLetter?: string
) => {
  await ky.post('https://api.hh.ru/negotiations', {
    headers: buildHeaders(token),
    body: buildFormData(resumeId, vacancyId, coverLetter),
  })
}

export const applyVacancy = async (ctx: Context) => {
  const { resumeId } = ctx.params as { resumeId: string }
  const { vacancyId, coverLetter } = (await ctx.body) as {
    vacancyId: string
    coverLetter?: string
  }
  const token = getAccessToken(ctx)

  if (!isAccessTokenValid(token)) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. No access token found.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    await applyToVacancy(token!, resumeId, vacancyId, coverLetter)
    return JSON.stringify({
      message: `Successfully applied to vacancy ${vacancyId}.`,
    })
  } catch (e: unknown) {
    const err = e as Error
    console.error(`Failed to apply to vacancy ${vacancyId}:`, err)
    return new Response(
      JSON.stringify({ message: 'Error applying to the vacancy' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const applyAllVacancies = async (ctx: Context) => {
  const { resumeId } = ctx.params as { resumeId: string }
  const { vacancies, coverLetter } = (await ctx.body) as {
    vacancies: VacancyInput[]
    coverLetter?: string
  }
  const token = getAccessToken(ctx)

  if (!isAccessTokenValid(token)) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. No access token found.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const results = await Promise.allSettled(
    vacancies.map((v) => applyToVacancy(token!, resumeId, v.id, coverLetter))
  )

  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      const err = result.reason as Error
      console.error(`Failed to apply to vacancy ${vacancies[i].id}:`, err)
    }
  })

  const success = results.filter((r) => r.status === 'fulfilled').length
  const fail = results.filter((r) => r.status === 'rejected').length

  return JSON.stringify({
    message: `Applied to ${success} vacancies successfully. ${fail} applications failed.`,
  })
}

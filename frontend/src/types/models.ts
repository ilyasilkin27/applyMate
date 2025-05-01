export interface Vacancy {
  id: string
  name: string
  employer?: { name?: string }
  salary?: { from?: number; to?: number; currency?: string }
  published_at: string
  alternate_url: string
  has_test?: boolean
  [key: string]: unknown
}

export interface Resume {
  id: string
  title?: string
  first_name?: string
  middle_name?: string
  last_name?: string
  [key: string]: unknown
}

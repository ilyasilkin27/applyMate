export interface HHVacancy {
  id: string;
  name: string;
  area: {
    name: string;
  };
  salary: {
    from: number | null;
    to: number | null;
    currency: string;
  } | null;
  employer: {
    name: string;
  };
  snippet: {
    requirement: string;
    responsibility: string;
  };
  schedule: {
    name: string;
  };
  experience: {
    name: string;
  };
  employment: {
    name: string;
  };
  published_at: string;
  created_at: string;
  archived: boolean;
  url: string;
  alternate_url: string;
}

export interface HHResponse {
  items: HHVacancy[];
  found: number;
  pages: number;
  per_page: number;
  page: number;
}

export interface SearchParams {
  text?: string;
  area?: string;
  experience?: string;
  employment?: string;
  schedule?: string;
  period?: number;
  page?: number;
  per_page?: number;
}

export interface ApplyParams {
  resumeId: string;
  vacancyId: string;
  message?: string;
}

export interface SimilarParams {
  resumeId: string;
  page?: number;
  per_page?: number;
} 
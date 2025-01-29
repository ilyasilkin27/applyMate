export const getAccessToken = (req) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

export const isAccessTokenValid = (accessToken) => !!accessToken;

export const buildHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  "HH-User-Agent": "ApplyMate/1.0 (ilyasilkin27@gmail.com)",
});

export const buildQueryParams = (req) => {
  const {
    per_page = 100,
    page = 0,
    text,
    experience,
    employment,
    schedule,
    area,
    currency,
    salary,
    only_with_salary = false,
    order_by,
  } = req.query;

  return {
    per_page,
    page,
    text,
    experience,
    employment,
    schedule,
    area,
    currency,
    salary,
    only_with_salary,
    order_by,
  };
};

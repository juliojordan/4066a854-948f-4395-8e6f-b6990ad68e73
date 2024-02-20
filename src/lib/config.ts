export function validateConfig() {
  for (const key of ["API_URL", "CANDIDATE_ID"]) {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable ${key}`);
    }
  }
}

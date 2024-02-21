import { appendOnlyLog } from "../append-only-log";
import { logger } from "../lib/logger";

export async function polyanetPromiseFactory(column: number, row: number) {
  const response = await fetch(`${process.env.API_URL}/polyanets`, {
    body: JSON.stringify({
      candidateId: process.env.CANDIDATE_ID,
      column,
      row,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    logger.error(`Polyanet creation failed at ${column}:${row}`);
    logger.error(`${response.status} ${response.statusText}`);
    throw new Error(`Polyanet creation failed at ${column}:${row}`);
  } else {
    appendOnlyLog.push({ column, name: "create-polyanet", row });
  }
}

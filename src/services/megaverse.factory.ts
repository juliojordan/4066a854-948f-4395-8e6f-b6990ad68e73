import { appendOnlyLog } from "../append-only-log";
import { logger } from "../lib/logger";

export async function polyanetFactory(column: number, row: number) {
  return new Promise<void>((resolve, reject) => {
    fetch(`${process.env.API_URL}/polyanets`, {
      body: JSON.stringify({
        candidateId: process.env.CANDIDATE_ID,
        column,
        row,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        appendOnlyLog.push({ column, name: "create-polyanets", row });
        resolve();
      } else {
        logger.error(`Polyanet creation failed at ${column}:${row}`);
        logger.error(`${response.status} ${response.statusText}`);
        reject(`Polyanet creation failed at ${column}:${row}`);
      }
    });
  });
}

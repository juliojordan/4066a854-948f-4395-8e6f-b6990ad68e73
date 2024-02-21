import { appendOnlyLog } from "../append-only-log";
import { logger } from "./logger";

export async function rollback() {
  for (const { column, row } of appendOnlyLog.filter(
    ({ name }) => name === "create-polyanet",
  )) {
    logger.warn(`Deleting Polyanet at ${column}:${row}`);

    const response = await fetch(`${process.env.API_URL}/polyanets`, {
      body: JSON.stringify({
        candidateId: process.env.CANDIDATE_ID,
        column,
        row,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    if (!response.ok) {
      logger.error("Metaverse rollback failed. All hope is gone");
    }
  }
}

import { appendOnlyLog } from "../append-only-log";
import { logger } from "../lib/logger";

export async function polyanetPromiseFactory(column: number, row: number) {
  const url = new URL(
    `${process.env.API_URL}/polyanets/${process.env.CANDIDATE_ID}`,
  );
  const params = new URLSearchParams();
  params.append("column", column.toString());
  params.append("row", row.toString());
  url.search = params.toString();

  const response = await fetch(url, {
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

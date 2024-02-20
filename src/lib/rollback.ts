import { appendOnlyLog } from "../append-only-log";
import { logger } from "./logger";

export async function rollback() {
  for (const { column, row } of appendOnlyLog.filter(
    ({ name }) => name === "create-polyanet",
  )) {
    const url = new URL(
      `${process.env.API_URL}/polyanet/${process.env.CANDIDATE_ID}`,
    );
    const params = new URLSearchParams();
    params.append("column", column.toString());
    params.append("row", row.toString());
    url.search = params.toString();

    logger.warn(`Deleting Polyanet at ${column}:${row}`);

    const response = await fetch(url, {
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

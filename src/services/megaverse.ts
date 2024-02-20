import { appendOnlyLog } from "../append-only-log";
import { logger } from "../lib/logger";
import { map as mapJsonToSuperPerformanceDataStructure } from "../lib/map";
import { rollback } from "../lib/rollback";
import { validate } from "../lib/validate";
import { polyanetPromiseFactory } from "./polyanet";

export async function getMegaverse(): Promise<[boolean[], number]> {
  const response = await fetch(
    `${process.env.API_URL}/map/${process.env.CANDIDATE_ID}/goal`,
  );

  if (
    response.ok &&
    response.headers.get("Content-Type")?.includes("application/json")
  ) {
    const map = await response.json();
    validate(map);

    const { goal: megaverse } = map;
    return mapJsonToSuperPerformanceDataStructure(megaverse);
  } else {
    throw new Error(`${response.status} Metaverse Not Found`);
  }
}

export async function populateMegaverse(data: boolean[], width: number) {
  const promises: Promise<void>[] = [];
  for (let index = 0; index < data.length; index++) {
    const isPolyanet = data[index];

    if (isPolyanet) {
      const column = index % width;
      const row = Math.floor(index / width);

      logger.info(`Creating Polyanet at ${column}:${row}`);

      promises.push(polyanetPromiseFactory(column, row));
    }
  }
  const result = await Promise.allSettled(promises);

  const isFailed = result.some(({ status }) => status === "rejected");

  if (isFailed) {
    if (appendOnlyLog.length > 0) {
      logger.warn("Rolling back changes");
      await rollback();
    }
    throw new Error("Metaverse creation failed");
  }
}

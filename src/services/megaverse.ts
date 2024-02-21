import { appendOnlyLog } from "../append-only-log";
import { SPACE } from "../constants";
import { logger } from "../lib/logger";
import { rollback } from "../lib/rollback";
import { wait } from "../lib/wait";
import { MegaverseIterator } from "./megaverse.iterator";
import { polyanetFactory } from "./megaverse.factory";
import {
  mapAstralObject,
  mapMegaverse as mapJsonToSuperPerformanceDataStructure,
} from "./megaverse.map";
import { validatePhaseOne, validatePhaseTwo } from "./megaverse.validator";

export async function getMegaversePhaseOne(): Promise<[boolean[], number]> {
  const response = await fetch(
    `${process.env.API_URL}/map/${process.env.CANDIDATE_ID}/goal`,
  );

  if (
    response.ok &&
    response.headers.get("Content-Type")?.includes("application/json")
  ) {
    const map = await response.json();
    validatePhaseOne(map);

    const { goal: megaverse } = map;
    return mapJsonToSuperPerformanceDataStructure(megaverse);
  } else {
    throw new Error(`${response.status} Metaverse Not Found`);
  }
}

export async function populateMegaversePhaseOne(
  data: boolean[],
  width: number,
) {
  const promises: Promise<void>[] = [];
  for (let index = 0; index < data.length; index++) {
    const isPolyanet = data[index];

    if (isPolyanet) {
      const column = index % width;
      const row = Math.floor(index / width);

      logger.info(`Creating Polyanet at ${row}:${column}`);

      promises.push(polyanetFactory(column, row));
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

export async function populateMegaversePhaseTwo() {
  const response = await fetch(
    `${process.env.API_URL}/map/${process.env.CANDIDATE_ID}/goal`,
  );

  if (
    response.ok &&
    response.headers.get("Content-Type")?.includes("application/json")
  ) {
    const map = await response.json();
    validatePhaseTwo(map);

    const { goal: megaverse } = map;

    const megaverseIterator = new MegaverseIterator(megaverse);

    for (const { column, name, row } of megaverseIterator) {
      if (name && name !== SPACE) {
        const { resource, ...rest } = mapAstralObject(name);

        logger.info(`Creating ${resource} at ${row}:${column}`);

        const response = await fetch(`${process.env.API_URL}/${resource}`, {
          body: JSON.stringify({
            candidateId: process.env.CANDIDATE_ID,
            column,
            row,
            ...rest,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        if (response.ok) {
          appendOnlyLog.push({ column, name: `create-${resource}`, row });
          // HACK To avoid backpreassure
          await wait(1000);
        } else {
          logger.error(`${response.status} ${response.statusText}`);
          throw new Error(`${resource} creation failed at ${column}:${row}`);
        }
      }
    }
  } else {
    throw new Error(`${response.status} Metaverse Not Found`);
  }
}

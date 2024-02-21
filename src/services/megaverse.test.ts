import "dotenv/config";
import { test } from "vitest";

import { getMegaversePhaseOne } from "./megaverse";

test("Happy path", async function () {
  const [data, length] = await getMegaversePhaseOne();

  expect(Array.isArray(data)).toBe(true);
  expect(typeof length).toBe("number");
});

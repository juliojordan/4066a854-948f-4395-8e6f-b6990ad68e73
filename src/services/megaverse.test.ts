import "dotenv/config";
import { test } from "vitest";

import { getMegaverse } from "./megaverse";

test("Happy path", async function () {
  const [data, length] = await getMegaverse();

  expect(Array.isArray(data)).toBe(true);
  expect(typeof length).toBe("number");
});

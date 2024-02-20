import { expect, test } from "vitest";
import { Megaverse, POLYANET, SPACE } from "../types";
import { map } from "./map";

test("Happy path", function () {
  const megaverse: Megaverse = [
    [SPACE, SPACE],
    [POLYANET, SPACE],
  ];

  const [data, length] = map(megaverse);

  expect(data).toEqual([false, false, true, false]);
  expect(length).toEqual(2);
});

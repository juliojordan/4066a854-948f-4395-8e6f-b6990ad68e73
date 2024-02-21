import { expect, test } from "vitest";
import { Megaverse } from "../types";
import { mapMegaverse } from "./megaverse.map";
import { POLYANET, SPACE } from "../constants";

test("Happy path", function () {
  const megaverse: Megaverse = [
    [SPACE, SPACE],
    [POLYANET, SPACE],
  ];

  const [data, length] = mapMegaverse(megaverse);

  expect(data).toEqual([false, false, true, false]);
  expect(length).toEqual(2);
});

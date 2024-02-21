import { expect, test } from "vitest";
import { Megaverse } from "../types";
import { validatePhaseOne } from "./megaverse.validator";
import { POLYANET, SPACE } from "../constants";

test("Happy path", function () {
  const input: { goal: Megaverse } = {
    goal: [
      [POLYANET, SPACE],
      [SPACE, POLYANET],
    ],
  };

  validatePhaseOne(input);
});

test("Throws an error", function () {
  const input = [
    [POLYANET, SPACE],
    [SPACE, "OOPS"],
  ];

  // @ts-expect-error No worries, we're testing the error
  expect(() => validate(input)).toThrow();
});

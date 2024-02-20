import { expect, test } from "vitest";
import { Megaverse, POLYANET, SPACE } from "../types";
import { validate } from "./validate";

test("Happy path", function () {
  const input: { goal: Megaverse } = {
    goal: [
      [POLYANET, SPACE],
      [SPACE, POLYANET],
    ],
  };

  validate(input);
});

test("Throws an error", function () {
  const input = [
    [POLYANET, SPACE],
    [SPACE, false],
  ];

  // @ts-expect-error No worries, we're testing the error
  expect(() => validate(input)).toThrow();
});

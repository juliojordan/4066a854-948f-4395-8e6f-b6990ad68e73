import { z } from "zod";
import {
  POLYANET,
  SPACE,
  BLUE_SOLOON,
  DOWN_COMETH,
  LEFT_COMETH,
  PURPLE_SOLOON,
  RED_SOLOON,
  RIGHT_COMETH,
  UP_COMETH,
  WHITE_SOLOON,
} from "../constants";
import { Megaverse } from "../types";

export function validatePhaseOne(input: { goal: Megaverse }): void {
  const schema = z.object({
    goal: z.array(z.array(z.enum([POLYANET, SPACE]))),
  });
  schema.parse(input);
}

export function validatePhaseTwo(input: { goal: Megaverse }): void {
  const schema = z.object({
    goal: z.array(
      z.array(
        z.enum([
          BLUE_SOLOON,
          DOWN_COMETH,
          LEFT_COMETH,
          POLYANET,
          PURPLE_SOLOON,
          RED_SOLOON,
          RIGHT_COMETH,
          SPACE,
          UP_COMETH,
          WHITE_SOLOON,
        ]),
      ),
    ),
  });
  schema.parse(input);
}

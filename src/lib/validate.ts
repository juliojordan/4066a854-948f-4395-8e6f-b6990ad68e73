import { z } from "zod";
import { POLYANET, SPACE, Megaverse } from "../types";

export function validate(input: { goal: Megaverse }): void {
  const schema = z.object({
    goal: z.array(z.array(z.enum([POLYANET, SPACE]))),
  });
  schema.parse(input);
}

import { Megaverse, POLYANET } from "../types";

export function map(megaverse: Megaverse): [boolean[], number] {
  const data = megaverse.flat(2).map((el) => el === POLYANET);
  const width = megaverse.reduce((acc, el) => Math.max(acc, el.length), 0);
  return [data, width];
}

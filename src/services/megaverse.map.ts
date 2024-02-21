import {
  BLUE_SOLOON,
  COMETHS,
  DOWN_COMETH,
  LEFT_COMETH,
  POLYANET,
  POLYANETS,
  PURPLE_SOLOON,
  RED_SOLOON,
  RIGHT_COMETH,
  SOLOONS,
  UP_COMETH,
  WHITE_SOLOON,
} from "../constants";
import { Megaverse, Resource } from "../types";

export function mapAstralObject(name: string): {
  color?: string;
  direction?: string;
  resource: Resource;
} {
  switch (name) {
    case BLUE_SOLOON:
      return { color: "blue", resource: SOLOONS };
    case DOWN_COMETH:
      return { direction: "down", resource: COMETHS };
    case LEFT_COMETH:
      return { direction: "left", resource: COMETHS };
    case POLYANET:
      return { resource: POLYANETS };
    case PURPLE_SOLOON:
      return { color: "purple", resource: SOLOONS };
    case RED_SOLOON:
      return { color: "red", resource: SOLOONS };
    case RIGHT_COMETH:
      return { direction: "right", resource: COMETHS };
    case UP_COMETH:
      return { direction: "up", resource: COMETHS };
    case WHITE_SOLOON:
      return { color: "white", resource: SOLOONS };
    default:
      throw new Error("Unknown element");
  }
}

export function mapMegaverse(megaverse: Megaverse): [boolean[], number] {
  const data = megaverse.flat(2).map((el) => el === POLYANET);
  const width = megaverse.reduce((acc, el) => Math.max(acc, el.length), 0);
  return [data, width];
}

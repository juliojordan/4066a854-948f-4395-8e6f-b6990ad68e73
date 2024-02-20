interface Base {
  column: number;
  row: number;
}

export interface Cometh extends Base {
  direction: "down" | "left" | "right" | "up";
}

export interface Soloons extends Base {
  color: "blue" | "purple" | "red" | "white";
}

export interface Polyanet extends Base {}

export const COMETH = "COMETH";
export const POLYANET = "POLYANET";
export const SOLOONS = "SOLOONS";
export const SPACE = "SPACE";

export type AppendOnlyLogEntry = {
  column: number;
  name: "create-cometh" | "create-polyanet" | "create-soloons";
  row: number;
};

export type Megaverse = ("POLYANET" | "SPACE")[][];

export interface Base {
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

export type AppendOnlyLogEntry = {
  column: number;
  name: "create-comeths" | "create-polyanets" | "create-soloons";
  row: number;
};

export type Megaverse = (
  | "BLUE_SOLOON"
  | "COMETH"
  | "DOWN_COMETH"
  | "LEFT_COMETH"
  | "POLYANET"
  | "PURPLE_SOLOON"
  | "RED_SOLOON"
  | "RIGHT_COMETH"
  | "SOLOONS"
  | "SPACE"
  | "UP_COMETH"
  | "WHITE_SOLOON"
)[][];

export type Resource = "comeths" | "polyanets" | "soloons";

import { Megaverse } from "../types";

export class MegaverseIterator {
  length: number;
  megaverse: Megaverse;
  width: number;

  constructor(megaverse: Megaverse) {
    this.length = megaverse.length;
    this.megaverse = megaverse;
    this.width = megaverse.reduce((acc, el) => Math.max(acc, el.length), 0);
  }

  [Symbol.iterator]() {
    let column = 0;
    let row = 0;
    return {
      next: () => {
        const value = { column, name: this.megaverse?.[row]?.[column], row };
        if (value) {
          column++;
          if (column > this.length - 1) {
            column = 0;
            row++;
          }
        }
        return { done: value.name ? false : true, value };
      },
    };
  }
}

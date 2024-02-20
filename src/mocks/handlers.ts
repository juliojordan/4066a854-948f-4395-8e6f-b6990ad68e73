import { http, HttpResponse } from "msw";
import { Megaverse, POLYANET, SPACE } from "../types";

const megaverse: Megaverse = [
  [SPACE, SPACE],
  [POLYANET, SPACE],
];

export const handlers = [
  http.get(
    /^https:\/\/challenge\.crossmint\.io\/api\/map\/[a-f0-9-]{36}\/goal$/,
    () => {
      return HttpResponse.json({
        goal: megaverse,
      });
    },
  ),
];

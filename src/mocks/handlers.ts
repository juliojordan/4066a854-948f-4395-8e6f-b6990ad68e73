import { http, HttpResponse } from "msw";
import { Megaverse } from "../types";
import { POLYANET, SPACE } from "../constants";

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

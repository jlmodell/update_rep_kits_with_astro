// server/router/index.ts
import superjson from "superjson";

import { createRouter } from "./context";
import { repRouter } from "./router.reps";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("reps.", repRouter);

export type AppRouter = typeof appRouter;

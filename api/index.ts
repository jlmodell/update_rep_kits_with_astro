import * as trpcExpress from "@trpc/server/adapters/express";
import * as trpc from "@trpc/server";
import express from "express";
import superjson from "superjson";
import { z } from "zod";

import prisma from "../utils/prisma";

const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const session = req && res && {};
  // (await getServerSession(req, res, nextAuthOptions));

  return {
    req,
    res,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

const createRouter = () => trpc.router<Context>();

const appRouter = createRouter()
  .transformer(superjson)
  .query("reps", {
    async resolve() {
      return await prisma.reps.findMany({});
    },
  })
  .query("kits", {
    async resolve() {
      return await prisma.kits.findMany({});
    },
  });

export type AppRouter = typeof appRouter;

const app = express();

app.use((req, _res, next) => {
  // request logger
  console.log("⬅️ ", req.method, req.path, req.body ?? req.query);

  next();
});

app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/api", (_req, res) => {
  res.send("hello world");
});

module.exports = app;

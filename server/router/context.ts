import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = async ({
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

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();

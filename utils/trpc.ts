// utils/trpc.ts

// import { createReactQueryHooks } from "@trpc/react";
import { createTRPCClient } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";

import type { AppRouter } from "../server/router";

// export const trpc = createReactQueryHooks<AppRouter>();
// export const trpc = createTRPCClient<AppRouter>({
//   url: "/api/trpc",
// });
const url = `http://localhost:3000/api/trpc`;

export const trpc = createTRPCClient<AppRouter>({
  links: [
    () =>
      ({ op, prev, next }) => {
        console.log("->", op.type, op.path, op.input);

        return next(op, (result) => {
          console.log("<-", op.type, op.path, op.input, ":", result);
          prev(result);
        });
      },
    httpBatchLink({ url }),
  ],
});

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferQueryInput<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureInput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferMutationOutput<
  TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type inferMutationInput<
  TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureInput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type { AppRouter };

// server/router/router.reps.ts
import { z } from "zod";

import prisma from "../../utils/prisma";

import { createRouter } from "./context";

export const repRouter = createRouter().query("find", {
  input: z.object({
    email: z.string().nullish(),
  }),
  async resolve({ input }) {
    const reps = await prisma.reps.findMany({
      where: { email: input.email || "" },
    });

    console.log({ reps });

    return reps;
  },
});

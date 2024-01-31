import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getAuth, SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/server';
import { prisma } from "../db";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

const createContextInner = ({ auth }: AuthContext) => {
  return {
    auth,
    prisma,
  };
};

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
  const innerContext = createContextInner({ auth: getAuth(opts.req) });
  return innerContext;
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  })
})

export const protectedProcedure = t.procedure.use(isAuthed);

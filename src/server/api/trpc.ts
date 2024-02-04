import {
	SignedInAuthObject,
	SignedOutAuthObject,
	getAuth,
} from '@clerk/nextjs/server';
import * as trpc from '@trpc/server';
import { TRPCError, initTRPC } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { prisma } from '../db';

interface AuthContext {
	auth: SignedInAuthObject | SignedOutAuthObject;
}

const createContextInner = ({ auth }: AuthContext) => {
	return {
		auth,
		prisma,
	};
};

export const createContext = (opts: trpcNext.CreateNextContextOptions) => {
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
		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
	}
	return next({
		ctx: {
			auth: ctx.auth,
		},
	});
});

export const protectedProcedure = t.procedure.use(isAuthed);

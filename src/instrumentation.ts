import { PrismaInstrumentation } from '@prisma/instrumentation';
import { registerOTel } from '@vercel/otel';

const prismaInstrumentation = new PrismaInstrumentation({
	middleware: true, // Enable middleware tracing if needed
});

export function register() {
	registerOTel({
		serviceName: 'recipebook',
		traceExporter: 'auto',
		instrumentations: [prismaInstrumentation],
	});
}

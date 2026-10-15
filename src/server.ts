// src/server.ts
import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import '@/jobs';

export default createServerEntry({
	fetch(request, opts) {
		return handler.fetch(request, opts);
	},
});

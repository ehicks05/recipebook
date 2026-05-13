import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import '@/jobs';

export default createServerEntry({
	fetch(request) {
		return handler.fetch(request);
	},
});

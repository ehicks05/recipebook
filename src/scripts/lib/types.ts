import type { InstaQLResult } from '@instantdb/react';
import type { AppSchema } from '@/instant.schema';

export type $Users = InstaQLResult<
	AppSchema,
	{ $users: { $: {}; recipes: { ingredients: {}; favoritedBy: {}; image: {} } } }
>['$users'];

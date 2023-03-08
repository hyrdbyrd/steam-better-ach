import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { userApi } from '@/api';

export const GET = (async ({ url }) =>
    json(await userApi.getPlayerSummaries(url.searchParams.get('userid') || ''))) satisfies RequestHandler;

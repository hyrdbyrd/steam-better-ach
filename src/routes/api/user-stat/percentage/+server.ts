import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { userApiStats } from '@/api';

export const GET = (async ({ url }) =>
    json(await userApiStats.getAchivementsPercentage(url.searchParams.get('userid') || ''))) satisfies RequestHandler;

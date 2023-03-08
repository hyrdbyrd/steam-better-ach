import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { userApiStats } from '@/api';

export const GET = (async ({ url }) =>
    json(
        await userApiStats.getPlayerAchivements(
            url.searchParams.get('userid') || '',
            url.searchParams.get('gameid') || ''
        )
    )) satisfies RequestHandler;

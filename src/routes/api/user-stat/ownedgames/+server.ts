import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { playerApi } from '@/api';

export const GET = (async ({ url }) =>
    json(await playerApi.getOwnedGames(url.searchParams.get('userid') || ''))) satisfies RequestHandler;

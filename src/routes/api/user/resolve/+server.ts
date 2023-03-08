import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { userApi } from '@/api';

export const GET = (async ({ url }) =>
    json(await userApi.resolveVanityUrl(url.searchParams.get('url') || ''))) satisfies RequestHandler;

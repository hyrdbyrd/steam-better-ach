import { redirect } from '@sveltejs/kit';

import type { PlayerOwnedGames_Data, ApiResponse } from '@/types';

import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async ({ fetch, params, url }) => {
    const userid = params.userid;
    if (/\D/.test(userid)) {
        const steamid = await fetch(`/api/user/resolve/?url=${userid}`)
            .then((e) => e.json())
            .then((e) => e.steamid);

        if (!steamid) throw redirect(300, '/');

        throw redirect(300, url.pathname.split('/').slice(0, -1).join('/') + `/${steamid}`);
    }

    const data = await fetch(`/api/user-stat/ownedgames?userid=${userid}`).then<ApiResponse<PlayerOwnedGames_Data>>(
        (e) => e.json()
    );

    if (!data.success || !data.games) throw redirect(300, '/');

    return { games: data.games, userid };
}) satisfies PageLoad;

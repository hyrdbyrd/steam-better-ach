import type { AchivementsPlayerStats, SchemaForGame } from '@/types';
import type { PageLoad } from './$types';

export const prerender = 'auto';

export const ssr = true;

export const load = (async ({ params, fetch }) => {
    const { userid, gameid } = params;

    const [current, total] = await Promise.all([
        fetch(`/api/user-stat/achievements?userid=${userid}&gameid=${gameid}`)
            .then<AchivementsPlayerStats>((e) => e.json())
            .then(
                (e) =>
                    (e.success &&
                        e.playerstats.achievements?.reduce<Record<string, typeof e.playerstats.achievements[0]>>(
                            (acc, cur) => ((acc[cur.apiname] = cur), acc),
                            {}
                        )) ||
                    {}
            ),
        fetch(`/api/user-stat/game-stats?gameid=${gameid}`).then<SchemaForGame>((e) => e.json()),
    ]);

    return {
        total,
        userid,
        gameid,
        current,
    };
}) satisfies PageLoad;

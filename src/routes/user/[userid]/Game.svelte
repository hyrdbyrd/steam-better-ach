<script lang="ts">
    import { page } from '$app/stores';
    import Image from '@/components/Image/Image.svelte';

    import { getCoverByAppId } from '@/lib/img/getCoverByAppId';

    import type { Ach, PlayerOwnedGames_Data_Data, AchivementsPlayerStats } from '@/types';
    import { onMount } from 'svelte';

    export let userid: string;
    export let hidden: boolean = false;
    export let game: PlayerOwnedGames_Data_Data & { ached?: Ach };
    export let ach: Ach = game.ached || undefined;

    onMount(() => {
        fetch(`/api/user-stat/achievements?userid=${userid}&gameid=${game.appid}`)
            .then<AchivementsPlayerStats>((e) => e.json())
            .then<Ach>((e) => {
                if (!e.success || !e.playerstats?.achievements) return undefined;
                return {
                    ach_total: e.playerstats.achievements.length,
                    ach_cur: e.playerstats.achievements.filter((e) => e.achieved).length,
                };
            })
            .then((data) => (ach = data));
    });
</script>

<a class="game" href="{$page.url.pathname}/games/{game.appid}" class:hidden>
    <Image alt={game.name} src={getCoverByAppId(game.appid)} />
    <span class="name">
        {game.name}
    </span>
    <span class="ach">
        {#if ach?.ach_cur !== undefined && ach?.ach_total !== undefined}
            {ach.ach_cur} / {ach.ach_total}
        {/if}
    </span>
</a>

<style>
    .game {
        padding-right: 80px;

        box-sizing: border-box;

        font-size: 32px;

        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .game:hover {
        box-shadow: inset 0 0 0 5px var(--secondary-bg);
    }

    .hidden {
        display: none;
    }

    .name {
        flex-grow: 2;

        font-weight: bolder;
        padding-left: 30px;
    }

    .ach {
        padding-left: 30px;
    }
</style>

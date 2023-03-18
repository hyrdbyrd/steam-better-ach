<script lang="ts">
    import Main from '@/layouts/Main/Main.svelte';
    import Header from '@/layouts/Header/Header.svelte';

    import Select from '@/components/Select/Select.svelte';
    import TextInput from '@/components/TextInput/TextInput.svelte';

    import { isMatchSearch } from '@/lib/regexp/isMatchSearch';

    import type { Ach, PlayerOwnedGames_Data_Data } from '@/types';

    import type { PageData } from './$types';

    import { i18n } from './page.i18n';

    import Game from './Game.svelte';

    export let data: PageData;

    let searching: string = '';
    let sortType: string = 'no-sort';

    const userid = data.userid;
    const games: Array<PlayerOwnedGames_Data_Data & { ach?: Ach }> = data.games;

    $: filteredAndSorted = games
        .filter(({ name }) => isMatchSearch(name, searching))
        .sort((a, b) => {
            if (sortType === 'by-name') return a.name > b.name ? 1 : -1;
            if (sortType.includes('-ach'))
                if (!a.ach) return 1;
                else if (!b.ach) return -1;
                else if (sortType === 'most-ach') return b.ach.ach_cur - a.ach.ach_cur;
                else if (sortType === 'less-ach') return a.ach.ach_cur - b.ach.ach_cur;
                else if (sortType === 'most-ach-count') return b.ach.ach_total - a.ach.ach_total;
                else if (sortType === 'less-ach-count') return a.ach.ach_total - b.ach.ach_total;

            return 0;
        });

    $: sortOpts = ['no-sort', 'by-name', 'most-ach', 'less-ach', 'most-ach-count', 'less-ach-count'].map((value) => ({
        value,
        display: $i18n(value),
    }));
</script>

<Header fixed>
    <Select bind:value={sortType} options={sortOpts} />
    <TextInput bind:value={searching} placeholder={$i18n('placeholder-search')} />
</Header>

<Main>
    {#each filteredAndSorted as game (game.appid)}
        <Game {game} {userid} bind:ach={game.ach} />
    {/each}
</Main>

<style>
    :global(.form > *:not(:last-child)) {
        margin-right: 12px;
    }
</style>

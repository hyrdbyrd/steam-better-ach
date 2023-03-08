<script lang="ts">
    import Main from '@/layouts/Main/Main.svelte';
    import Header from '@/layouts/Header/Header.svelte';

    import Checkbox from '@/components/Checkbox/Checkbox.svelte';
    import TextInput from '@/components/TextInput/TextInput.svelte';

    import type { Ach, PlayerOwnedGames_Data_Data } from '@/types';

    import type { PageData } from './$types';
    import Select from '@/components/Select/Select.svelte';
    import Game from './Game.svelte';
    import { isMatchSearch } from '@/lib/regexp/isMatchSearch';

    export let data: PageData;

    let searching: string = '';
    let onlyWithAchived = true;
    let sortType: string = 'No sort';

    const sortOpts = [
        { value: 'No sort' },
        { value: 'By name' },
        { value: 'Most achieved' },
        { value: 'Less achieved' },
        { value: 'Most achieves count' },
        { value: 'Less achieves count' },
    ];

    const userid = data.userid;
    const games: Array<PlayerOwnedGames_Data_Data & { ach?: Ach }> = data.games;

    $: filteredAndSorted = games
        .filter(({ name }) => isMatchSearch(name, searching))
        .sort((a, b) => {
            if (sortType === 'By name') return a.name > b.name ? 1 : -1;
            if (sortType.includes('achieve'))
                if (!a.ach) return 1;
                else if (!b.ach) return -1;
                else if (sortType === 'Most achieved') return b.ach.ach_cur - a.ach.ach_cur;
                else if (sortType === 'Less achieved') return a.ach.ach_cur - b.ach.ach_cur;
                else if (sortType === 'Most achieves count') return b.ach.ach_total - a.ach.ach_total;
                else if (sortType === 'Less achieves count') return a.ach.ach_total - b.ach.ach_total;

            return 0;
        });
</script>

<Header fixed>
    <div class="form">
        <Select bind:value={sortType} options={sortOpts} />

        <div class="checkbox">
            <Checkbox bind:checked={onlyWithAchived} size={32}>
                <span class="only-ach" slot="addonRight">Only achieved</span>
            </Checkbox>
        </div>

        <TextInput bind:value={searching} />
    </div>
</Header>

<Main>
    {#each filteredAndSorted as game (game.appid)}
        <Game hidden={onlyWithAchived ? !game.ach : false} {game} {userid} bind:ach={game.ach} />
    {/each}
</Main>

<style>
    .form {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :global(.form > *:not(:last-child)) {
        margin-right: 12px;
    }

    .only-ach {
        font-size: 22px;
    }
</style>

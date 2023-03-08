<script lang="ts">
    import Checkbox from '@/components/Checkbox/Checkbox.svelte';
    import Image from '@/components/Image/Image.svelte';
    import TextInput from '@/components/TextInput/TextInput.svelte';
    import Header from '@/layouts/Header/Header.svelte';
    import Main from '@/layouts/Main/Main.svelte';
    import { isMatchSearch } from '@/lib/regexp/isMatchSearch';

    import type { PageData } from './$types';
    import Hidden from './Hidden.svelte';

    export let data: PageData;

    let searching = '';
    let showDone = false;
    let hideSecret = false;

    const total = data.total.success ? data.total.game?.availableGameStats?.achievements : [];
    const current = data.current;

    $: filteredAndSorted = total
        .filter(({ name }) => showDone || !current?.[name]?.achieved)
        .filter(({ hidden }) => !hideSecret || hidden !== 1)
        .filter(({ displayName }) => isMatchSearch(displayName, searching));
</script>

<Header fixed>
    <div class="form">
        <Checkbox size={24} bind:checked={showDone}>
            <span slot="addonRight">Show done</span>
        </Checkbox>
        <Checkbox size={24} bind:checked={hideSecret}>
            <span slot="addonRight">Hide secret achievements</span>
        </Checkbox>
        <TextInput bind:value={searching} />
    </div>
</Header>

<Main>
    {#each filteredAndSorted as ach}
        <div class="ach">
            <Image size={64} alt={ach.displayName} src={ach.icon} />
            <span class="text">
                <div class="name">
                    {ach.displayName}
                </div>
                {#if ach.description}
                    <div class="desc">
                        {ach.description}
                    </div>
                {/if}
            </span>
            <Hidden width="32px" height="32px" style={ach.hidden !== 1 ? 'opacity: 0' : '1'} />
            <div class="achieved" style:opacity={Boolean(current?.[ach.name]?.achieved) ? 1 : 0} />
        </div>
    {/each}
</Main>

<style>
    .form {
        display: flex;
        justify-content: center;
    }

    :global(.form > *) {
        margin-right: 15px;
    }

    .ach {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        box-sizing: border-box;

        padding-right: 30px;
    }

    .text {
        margin: 0 15px 0 10px;

        font-size: 24px;
        font-weight: bold;

        flex: 1;
    }

    .desc {
        font-size: 18px;
        color: var(--secondary-color);
    }

    .achieved {
        margin-left: 10px;

        width: 32px;
        height: 32px;

        color: var(--primary-light-color);

        background-color: green;
        border-radius: 12px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .achieved::before {
        content: '✔';
        display: block;
    }
</style>

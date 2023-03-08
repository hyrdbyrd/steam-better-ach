<script lang="ts">
    import cls from 'classnames';

    import Main from '@/layouts/Main/Main.svelte';
    import Header from '@/layouts/Header/Header.svelte';

    import Spin from '@/components/Spin/Spin.svelte';
    import Image from '@/components/Image/Image.svelte';
    import TextInput from '@/components/TextInput/TextInput.svelte';

    import { url, user, userData } from '@/store/user';

    $: player = ($userData.success && $userData.players[0]) || undefined;
</script>

<Header fixed>
    <TextInput bind:value={$url} class="input">
        <div slot="addonLeft">
            <Spin class={cls('loader', $user?.isLoading && 'loading')} />
        </div>
        <div slot="addonRight">
            {#if !$url}
                <div class="status empty" />
            {:else if $user.isLoading}
                <div class="status loading" />
            {:else if $user.data?.success}
                <div class="status success" />
            {:else}
                <div class="status rejected" />
            {/if}
        </div>
    </TextInput>
</Header>

<Main>
    {#if player}
        <div class="wrapper">
            <Image alt={player.personaname} src={player.avatarfull} />
            <span class="content">
                <span class="name">
                    {player.personaname}
                </span>
                <a class="link" href="/user/{player.steamid}">Yes, it's mine</a>
            </span>
        </div>
    {/if}
</Main>

<style>
    :global(.input) {
        width: 80vw;
    }

    :global(.loader:not(.loading)) {
        opacity: 0;
    }

    .content {
        padding: 0 15px;
    }

    .wrapper {
        display: flex;
        align-items: space-around;
        justify-content: center;
    }

    .status {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0 5px;

        --bg: transparent;
    }

    .status::before {
        content: '';
        display: block;

        width: 15px;
        height: 15px;

        border-radius: 100%;

        background-color: var(--bg);
    }

    .empty {
        --bg: gray;
    }

    .loading {
        --bg: yellow;
    }

    .success {
        --bg: green;
    }

    .rejected {
        --bg: red;
    }
</style>

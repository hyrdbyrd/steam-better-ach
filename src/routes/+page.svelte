<script lang="ts">
    import cls from 'classnames';

    import Main from '@/layouts/Main/Main.svelte';
    import Header from '@/layouts/Header/Header.svelte';

    import Spin from '@/images/Spin/Spin.svelte';

    import Link from '@/components/Link/Link.svelte';
    import Image from '@/components/Image/Image.svelte';
    import TextInput from '@/components/TextInput/TextInput.svelte';

    import { url, user, userData } from '@/store/user';

    import { i18n } from './page.i18n';

    $: player = ($userData.success && $userData.players[0]) || undefined;
</script>

<Header fixed>
    <TextInput bind:value={$url} class="input" placeholder={$i18n('Логин профиля')}>
        <Spin slot="addonLeft" class={cls('loader', $user?.isLoading && 'loading')} />
        <div
            slot="addonRight"
            class:empty={!$url}
            class="status rejected"
            class:loading={$user.isLoading}
            class:success={$user.data?.success}
        />
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
                <br />
                <Link href="/users/{player.steamid}">{$i18n('Да, это мой профиль')}</Link>
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

    /* Порядок перечисления статусов важен! */

    .rejected {
        --bg: red;
    }

    .loading {
        --bg: yellow;
    }

    .success {
        --bg: green;
    }

    .empty {
        --bg: gray;
    }
</style>

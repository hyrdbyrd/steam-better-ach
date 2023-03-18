<script lang="ts">
    import { page } from '$app/stores';

    import Theme from '@/components/Theme/Theme.svelte';
    import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.svelte';
    import Select from '@/components/Select/Select.svelte';

    import { toCapitalize } from '@/lib/text/toCapitalize';

    import { lang } from '@/store/lang';

    import Burger from './Burger.svelte';

    const breadcrumbsList = [{ href: '/', text: 'Main' }].concat(
        $page.url.pathname
            .split('/')
            .filter(Boolean)
            .map((path, idx, arr) => ({
                href: '/' + arr.slice(0, idx + 2).join('/'),
                text: toCapitalize(path),
            }))
            .filter((e) => isNaN(+e.text))
    );

    export let fixed = false;

    let active = false;
</script>

<Burger bind:active />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="overlay" class:active on:click={() => (active = !active)} />

<header class:fixed class:active>
    <div class="breadcrumbs">
        <Breadcrumbs list={breadcrumbsList} />
    </div>
    <div class="header-content">
        <slot />
    </div>
    <div class="nav">
        <Select
            bind:value={$lang}
            options={[
                {
                    display: 'Русский',
                    value: 'ru',
                },
                { display: 'English', value: 'en' },
            ]}
        />
        <Theme />
    </div>
</header>

<style>
    :global(header + *) {
        margin-top: 16px;
    }

    .fixed {
        position: fixed;

        width: 100%;

        top: 0;
        left: 0;

        z-index: 1;
    }

    :global(.fixed + *) {
        margin-top: 70px;
    }

    header {
        box-sizing: border-box;

        background-color: var(--primary-bg);

        height: 70px;

        padding: 10px 20px;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header-content {
        flex-grow: 2;

        display: flex;
        justify-content: center;
    }

    :global(.header-content > *:not(:last-child)) {
        margin-right: 15px;
    }

    .nav {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    @media (max-width: 1024px) {
        header,
        header.fixed {
            transition: all linear 0.2s;

            flex-direction: column;
            position: fixed;
            top: 0;
            left: -100vw;

            z-index: 1;

            width: 60vw;
            height: 100vh;

            background-color: var(--primary-bg);
        }

        .header-content {
            flex-direction: column;
        }

        :global(.header-content > *:not(:last-child)) {
            margin-bottom: 20px;
        }

        header.active,
        header.fixed.active {
            left: 0;
        }

        .overlay {
            position: fixed;
            left: 0;
            top: 0;

            z-index: 1;

            width: 100vw;
            height: 100vh;

            transition: all linear 0.2s;

            opacity: 0;

            background-color: var(--secondary-bg);

            z-index: -1;
        }

        .overlay.active {
            opacity: 0.8;

            z-index: 1;
        }
    }
</style>

<script lang="ts">
    import cls from 'classnames';

    import { theme } from '@/store/theme';

    import './styles.css';
    import { lang } from '@/store/lang';
</script>

<svelte:head>
    <title>Steam better achievements</title>

    <meta name="language" content={$lang} />
    <meta name="description" content="Steam better achievements" />
</svelte:head>

<div class={cls('theme', `theme_type_${$theme}`)}>
    <slot />
</div>

<style>
    :global(.theme) {
        box-sizing: border-box;

        display: flex;
        align-items: center;
        flex-direction: column;

        width: 100%;
        height: 100%;

        min-width: 100vw;
        min-height: 100vh;

        color: var(--primary-color);
        background-color: var(--primary-bg);
    }
</style>

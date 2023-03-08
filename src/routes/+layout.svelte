<script lang="ts">
    import cls from 'classnames';

    import { theme } from '@/store/theme';

    import './styles.css';
</script>

<svelte:head>
    <title>Steam better achievements</title>
    <meta name="description" content="Steam better achievements" />
</svelte:head>

<div class={cls('theme', `theme_type_${$theme}`, 'app')}>
    <slot />
</div>

<style>
    .app,
    :global(body) {
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        height: 100%;

        min-height: 100vh;

        color: var(--primary-color);
        background-color: var(--primary-bg);
    }
</style>

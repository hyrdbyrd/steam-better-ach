<script context="module" lang="ts">
    const svgCompByTheme: Record<ThemeType, ComponentType> = {
        dark: MoonSvg,
        light: SunSvg,
    };

    const fillByTheme: Record<ThemeType, string> = {
        dark: '#ffffff',
        light: '#000000',
    };
</script>

<script lang="ts">
    import { theme, type ThemeType } from '@/store/theme';

    import MoonSvg from './Moon.svg.svelte';
    import SunSvg from './Sun.svg.svelte';

    import type { ComponentType } from 'svelte';

    const changeTheme = () => {
        if ($theme === 'dark') $theme = 'light';
        else $theme = 'dark';
    };
</script>

<button on:click={changeTheme}>
    <svelte:component this={svgCompByTheme[$theme]} width="46px" height="46px" fill={fillByTheme[$theme]} />
</button>

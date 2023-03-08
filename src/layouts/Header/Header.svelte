<script lang="ts">
    import Theme from '@/components/Theme/Theme.svelte';

    export let fixed = false;
</script>

<header class:fixed>
    <div class="header-content">
        <slot />
    </div>
    <div class="nav">
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
    }
</style>

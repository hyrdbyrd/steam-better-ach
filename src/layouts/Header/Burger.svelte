<script lang="ts">
    export let active = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="burger" class:active on:click={() => (active = !active)}>
    <div class="burger-item" />
    <div class="burger-item" />
    <div class="burger-item" />
</div>

<style>
    .burger {
        display: none;

        position: fixed;
        background-color: var(--primary-bg);

        padding: 10px;

        left: 0;
        top: 0;

        z-index: 2;

        width: 30px;
    }

    .burger-item {
        display: block;
        height: 4px;
        width: 100%;
        border-radius: 10px;
        background: var(--primary-color);

        transition: all linear 0.2s;

        transform-origin: center center;
    }

    .burger .burger-item:not(:last-child) {
        margin-bottom: 5px;
    }

    .burger.active .burger-item:nth-child(1) {
        transform: translateY(10px) rotate(45deg);
    }

    .burger.active .burger-item:nth-child(2) {
        transform: scaleY(0);
    }

    .burger.active .burger-item:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }

    @media (max-width: 1024px) {
        .burger {
            display: block;
        }
    }
</style>

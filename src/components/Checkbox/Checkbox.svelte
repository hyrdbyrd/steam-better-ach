<script lang="ts">
    import { scale } from 'svelte/transition';

    export let checked = false;

    export let size: number = 16;
</script>

<div class="wrapper" class:checked>
    <input {...$$restProps} type="checkbox" bind:checked />

    {#if $$slots.addonLeft}
        <slot name="addonLeft" />
    {/if}

    <div class="checkbox" style:--size={size} style:width="{size}px" style:height="{size}px">
        {#if checked}
            <div class="fill" transition:scale={{ duration: 200 }}>✔</div>
        {/if}
    </div>

    {#if $$slots.addonRight}
        <slot name="addonRight" />
    {/if}
</div>

<style>
    input {
        box-sizing: border-box;
        cursor: pointer;

        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .wrapper {
        box-sizing: border-box;

        cursor: pointer;

        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wrapper > *:not(:last-child) {
        margin-right: 12px;
    }

    .checkbox {
        width: 16px;
        height: 16px;

        background: var(--secondary-bg);
        border-radius: 4px;
        padding: 2px;
    }

    .fill {
        width: 100%;
        height: 100%;

        font-weight: bolder;
        font-size: 24px;

        border-radius: 6px;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: var(--primary-bg);
        color: var(--secondary-bg);
    }
</style>

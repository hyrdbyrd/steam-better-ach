<script lang="ts">
    import Spin from '@/images/Spin/Spin.svelte';
    import Rejected from '@/images/Rejected/Rejected.svg.svelte';

    export let src: string;
    export let alt: string;

    export let size: number = 184;

    export let width: string = `${size}px`;
    export let height: string = `${size}px`;

    let isLoading = true;
    let isErrored = false;
</script>

<div class="wrapper" style:width style:height>
    {#if isLoading}
        {#if $$slots.loader}
            <slot name="loader" {width} {height} />
        {:else}
            <Spin {width} {height} />
        {/if}
    {/if}

    {#if isErrored}
        {#if $$slots.rejected}
            <slot name="rejected" {width} {height} />
        {:else}
            <Rejected {width} {height} />
        {/if}
    {/if}

    <img
        {src}
        {alt}
        style:width
        style:height
        class:isLoading
        class:isErrored
        on:load={() => (isLoading = false)}
        on:error={() => ((isLoading = false), (isErrored = true))}
    />
</div>

<style>
    img {
        object-fit: cover;
    }

    .wrapper {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: var(--padding-m);

        background-color: var(--secondary-bg);
    }

    .isLoading,
    .isErrored {
        position: absolute;
    }

    .isErrored {
        display: none;
    }
</style>

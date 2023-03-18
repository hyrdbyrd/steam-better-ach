<script lang="ts">
    export let hideOneItem = true;
    export let list: Array<{ text: string; href: string }> = [];
</script>

{#if list.length > 1 || !hideOneItem}
    <span class="wrapper">
        {#each [...list.entries()] as [idx, { text, href }]}
            {@const isCurrent = idx === list.length - 1}
            <svelte:element this={isCurrent ? 'span' : 'a'} {href} class:current={isCurrent}>
                {text}
                {#if !isCurrent}
                    /
                {/if}
            </svelte:element>
        {/each}
    </span>
{/if}

<style>
    .wrapper {
        color: var(--secondary-color);
    }

    .current {
        color: var(--primary-color);
    }
</style>

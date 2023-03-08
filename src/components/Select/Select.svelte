<script lang="ts">
    type T = $$Generic;

    export let options: Array<{ value: T; display?: string }> = [];
    export let value: T;
</script>

<select bind:value>
    {#each options as { value, display = value } (value)}
        <option {value}>
            {display}
        </option>
    {/each}
</select>

<style>
    select {
        font-weight: 400;
        font-size: 14px;

        -webkit-appearance: none;
        appearance: none;

        color: var(--primary-color);

        line-height: 1;
        outline: 0;
        padding: 0.65em 2.5em 0.55em 0.75em;

        border: 1px solid var(--secondary-bg);
        border-radius: 2px;

        background-color: var(--primary-bg);
    }
</style>

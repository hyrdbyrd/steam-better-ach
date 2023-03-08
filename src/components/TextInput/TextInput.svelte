<script>
    import cls from 'classnames';

    export let value = '';

    let withLeft = $$slots.addonLeft;
    let withRight = $$slots.addonRight;
</script>

<div class="wrapper">
    {#if withLeft}
        <div class="left">
            <slot name="addonLeft" />
        </div>
    {/if}
    <input
        {...$$restProps}
        on:input
        bind:value
        type="text"
        class={cls({ withLeft: $$slots.addonLeft, withRight: $$slots.addonRight }, $$restProps.class)}
    />
    {#if withRight}
        <div class="right">
            <slot name="addonRight" />
        </div>
    {/if}
</div>

<style>
    .left, .right { padding: 0 10px; }

    .wrapper {
        border: none;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    input {
        color: var(--primary-color);

        border-radius: 4px;

        border: 4px solid var(--secondary-bg);
        background-color: var(--primary-bg);

        outline: none !important;
    }
</style>

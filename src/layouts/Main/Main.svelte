<main>
    <slot />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;

        width: 90vw;
    }

    @media (max-width: 600px) {
        main {
            width: 95vw;
        }
    }
</style>

<script lang="ts">
    export let href: string;
</script>

<a class="link" {href}><slot /></a>

<style>
    .link {
        color: var(--link-color);
    }

    .link:hover {
        text-decoration: underline;
    }
</style>

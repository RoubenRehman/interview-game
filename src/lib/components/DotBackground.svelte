<script lang="ts">
    import { theme } from '$lib/stores/theme';
</script>

<div class="dot-background">
    <div class="dot-grid"></div>
</div>

<style>
    .dot-background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    }

    .dot-grid {
        width: 100%;
        height: 100%;
        background-image: radial-gradient(circle at center, currentColor 1px, transparent 1px);
        background-size: 30px 30px;
        opacity: 0.1;
    }

    :global([data-theme="dark"]) .dot-grid {
        color: white;
    }

    :global([data-theme="light"]) .dot-grid {
        color: black;
    }
</style>

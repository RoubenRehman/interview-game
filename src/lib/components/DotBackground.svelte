<script lang="ts">
    import { theme } from '$lib/stores/theme';
</script>

<div class="dot-background" style:background={$theme.colors.background}>
    <div class="dot-grid"></div>
</div>

<style>
    .dot-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }

    .dot-grid {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(circle at center, currentColor 1px, transparent 1px);
        background-size: 30px 30px;
        opacity: 0.2;
    }

    :global([data-theme="dark"]) .dot-grid {
        color: rgba(255, 255, 255, 0.7);
    }

    :global([data-theme="light"]) .dot-grid {
        color: rgba(0, 0, 0, 0.3);
    }
</style>

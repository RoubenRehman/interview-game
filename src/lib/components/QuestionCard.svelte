<script lang="ts">
    export let question: string;
    export let language: 'en' | 'de' = 'en';
    export let onNext: () => void;
    export let isTransitioning: boolean;

    import { fade } from 'svelte/transition';
    import { theme } from '$lib/stores/theme';
</script>

<div class="card-container">
    <div class="card" style:background={$theme.colors.card} style:box-shadow={$theme.shadows.card} style:border-radius={$theme.borderRadius.card}>
        <div class="question-container">
            {#if !isTransitioning}
                <p 
                    class="question"
                    transition:fade={{duration: 200}}
                    style:color={$theme.colors.text}
                >
                    {question}
                </p>
            {/if}
        </div>
        <button 
            class="next-button"
            on:click={onNext}
            disabled={isTransitioning}
            style:background={isTransitioning ? $theme.colors.disabled : $theme.colors.primary}
            style:border-radius={$theme.borderRadius.button}
        >
            {language === 'en' ? 'Next Question' : 'Nächste Frage'}
        </button>
    </div>
</div>

<style>
    .card-container {
        width: 100%;
        max-width: 600px;
        height: 300px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card {
        padding: 2rem;
        width: 100%;
        height: 300px;
        text-align: center;
        position: relative;
    }

    .question-container {
        position: absolute;
        top: 2rem;
        left: 2rem;
        right: 2rem;
        bottom: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .question {
        font-size: 1.5rem;
        line-height: 1.6;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .next-button {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
        min-width: 150px;
    }

    .next-button:disabled {
        cursor: not-allowed;
    }

    .next-button:not(:disabled):hover {
        background: var(--primary-hover) !important;
    }

    .next-button:focus {
        outline: none;
        box-shadow: var(--button-focus-shadow);
    }
</style>

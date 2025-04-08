<script lang="ts">
    export let question: string;
    export let language: 'en' | 'de' = 'en';
    export let onNext: () => void;
    export let isTransitioning: boolean;
    export let category: number;

    import { fade } from 'svelte/transition';
    import { theme } from '$lib/stores/theme';
    import { getCategoryName } from '$lib/stores/questions';

    $: categoryName = getCategoryName(category, language);
</script>

<div class="card-container">
    <div class="card" style:background={$theme.colors.card} style:border-radius={$theme.borderRadius.card}>
        <div class="category-label" style:color={$theme.colors.primary}>
            {categoryName}
        </div>
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
        perspective: 1000px;
    }

    .card {
        padding: 2rem;
        width: 100%;
        height: 300px;
        text-align: center;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.6s, box-shadow 0.3s ease;
    }

    .card:hover {
        transform: translateY(-5px);
    }

    .category-label {
        position: absolute;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
        border-radius: 999px;
        background: rgba(255, 71, 87, 0.1);
    }

    .question-container {
        position: absolute;
        top: 3.5rem;
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
        font-weight: 600;
        letter-spacing: 0.05em;
        transition: all 0.3s ease;
    }

    .next-button:disabled {
        cursor: not-allowed;
        opacity: 0.7;
        transform: translateX(-50%) !important;
    }

    .next-button:not(:disabled):hover {
        transform: translateX(-50%) translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 71, 87, 0.25);
    }

    .next-button:focus {
        outline: none;
        box-shadow: var(--button-focus-shadow);
    }

    @media (max-width: 640px) {
        .card {
            padding: 1.5rem;
        }

        .question {
            font-size: 1.25rem;
        }
    }
</style>

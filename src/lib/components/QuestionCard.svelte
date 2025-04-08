<script lang="ts">
    import { fade } from 'svelte/transition';
    import { getCategoryName } from '$lib/stores/questions';
    import { theme } from '$lib/stores/theme';

    export let question: string;
    export let language: string;
    export let onNext: () => void;
    export let isTransitioning: boolean;
    export let category: number;

    $: categoryName = getCategoryName(category, language);
</script>

<div 
    class="card"
    style:background={$theme.colors.card}
    style:color={$theme.colors.text}
    class:transitioning={isTransitioning}
    in:fade={{duration: 200}}
    out:fade={{duration: 200}}
>
    <div class="category" style:color={$theme.colors.primary}>
        {categoryName}
    </div>
    <div class="question">
        {question}
    </div>
    <button 
        class="next-button"
        on:click={onNext}
        disabled={isTransitioning}
        style:background={$theme.colors.primary}
    >
        {#if language === 'en'}
            Next Question
        {:else if language === 'de'}
            Nächste Frage
        {/if}
    </button>
</div>

<style>
    .card {
        padding: 2rem;
        border-radius: 1rem;
        position: relative;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        user-select: none;
        min-height: 300px;
        display: flex;
        flex-direction: column;
    }

    .card.transitioning {
        pointer-events: none;
    }

    .category {
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .question {
        font-size: 1.5rem;
        line-height: 1.4;
        margin-bottom: 2rem;
        font-weight: 500;
        flex-grow: 1;
        display: flex;
        align-items: center;
    }

    .next-button {
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 9999px;
        font-weight: 500;
        transition: all 0.3s ease;
        align-self: center;
    }

    .next-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .next-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    @media (max-width: 640px) {
        .card {
            padding: 1.5rem;
            min-height: 250px;
        }

        .question {
            font-size: 1.25rem;
        }

        .next-button {
            padding: 0.5rem 1.25rem;
            font-size: 0.875rem;
        }
    }
</style>

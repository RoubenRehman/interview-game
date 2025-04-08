<script lang="ts">
    export let question: string;
    export let language: 'en' | 'de' = 'en';
    export let onNext: () => void;
    export let isTransitioning: boolean;

    import { fade } from 'svelte/transition';
</script>

<div class="card-container">
    <div class="card">
        {#if !isTransitioning}
            <div class="question-container">
                <p 
                    class="question"
                    transition:fade={{duration: 200}}
                >
                    {question}
                </p>
            </div>
        {/if}
        <button 
            class="next-button"
            on:click={onNext}
            disabled={isTransitioning}
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
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
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
        color: #2d3748;
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
        background: #4299e1;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        min-width: 150px;
    }

    .next-button:disabled {
        background: #a0aec0;
        cursor: not-allowed;
    }

    .next-button:not(:disabled):hover {
        background: #3182ce;
    }

    .next-button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }
</style>

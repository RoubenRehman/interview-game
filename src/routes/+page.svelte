<script lang="ts">
    import { onMount } from 'svelte';
    import QuestionCard from '$lib/components/QuestionCard.svelte';
    import { questionStore, loadQuestions, nextQuestion, setLanguage } from '$lib/stores/questions';

    let currentQuestion = '';
    let currentLanguage: 'en' | 'de' = 'en';

    // Subscribe to the store
    questionStore.subscribe(store => {
        if (store.questions.length > 0) {
            currentQuestion = store.questions[store.currentIndex].translations[store.language];
            currentLanguage = store.language;
        }
    });

    onMount(() => {
        loadQuestions();
    });
</script>

<main>
    <div class="language-selector">
        <button 
            class:active={currentLanguage === 'en'} 
            on:click={() => setLanguage('en')}
        >
            English
        </button>
        <button 
            class:active={currentLanguage === 'de'} 
            on:click={() => setLanguage('de')}
        >
            Deutsch
        </button>
    </div>

    <div class="card-wrapper">
        {#if currentQuestion}
            <QuestionCard 
                question={currentQuestion}
                language={currentLanguage}
                onNext={nextQuestion}
            />
        {/if}
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background: #f7fafc;
    }

    .card-wrapper {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .language-selector {
        margin-bottom: 2rem;
        position: sticky;
        top: 1rem;
        z-index: 10;
    }

    .language-selector button {
        background: transparent;
        border: 2px solid #4299e1;
        color: #4299e1;
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .language-selector button.active {
        background: #4299e1;
        color: white;
    }

    .language-selector button:hover {
        background: #3182ce;
        border-color: #3182ce;
        color: white;
    }
</style>

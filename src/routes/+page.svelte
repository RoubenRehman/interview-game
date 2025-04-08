<script lang="ts">
    import { onMount } from 'svelte';
    import QuestionCard from '$lib/components/QuestionCard.svelte';
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
    import { questionStore, loadQuestions, nextQuestion, setLanguage } from '$lib/stores/questions';
    import { theme, isDarkMode } from '$lib/stores/theme';

    let currentQuestion = '';
    let currentLanguage: 'en' | 'de' = 'en';
    let isTransitioning = false;
    let currentCategory = 1;

    // Subscribe to the store
    questionStore.subscribe(store => {
        if (store.questions.length > 0) {
            const currentQuestionObj = store.questions[store.currentIndex];
            currentQuestion = currentQuestionObj.translations[store.language];
            currentLanguage = store.language;
            isTransitioning = store.isTransitioning;
            currentCategory = currentQuestionObj.category;
        }
    });

    // Check system preference for dark mode
    onMount(() => {
        loadQuestions();
        
        // Check system preference for dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode.set(prefersDark);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            isDarkMode.set(e.matches);
        });
    });
</script>

<main style:background={$theme.colors.background} style:color={$theme.colors.text}>
    <ThemeToggle />
    <div class="language-selector">
        <button 
            class:active={currentLanguage === 'en'}
            on:click={() => setLanguage('en')}
            style:background={currentLanguage === 'en' ? $theme.colors.primary : 'transparent'}
            style:color={currentLanguage === 'en' ? 'white' : $theme.colors.text}
        >
            English
        </button>
        <button 
            class:active={currentLanguage === 'de'}
            on:click={() => setLanguage('de')}
            style:background={currentLanguage === 'de' ? $theme.colors.primary : 'transparent'}
            style:color={currentLanguage === 'de' ? 'white' : $theme.colors.text}
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
                isTransitioning={isTransitioning}
                category={currentCategory}
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
        border: 2px solid;
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .language-selector button:hover {
        background: var(--primary-hover) !important;
        border-color: var(--primary-hover) !important;
        color: white !important;
    }
</style>

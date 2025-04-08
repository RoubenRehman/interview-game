<script lang="ts">
    import { onMount } from 'svelte';
    import QuestionCard from '$lib/components/QuestionCard.svelte';
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
    import DotBackground from '$lib/components/DotBackground.svelte';
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

    onMount(async () => {
        await loadQuestions();
        
        // Check system preference for dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode.set(prefersDark);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            isDarkMode.set(e.matches);
        });
    });
</script>

<div class="app" style:color={$theme.colors.text}>
    <div class="container" style:background={$theme.colors.background}>
        <DotBackground />
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
    </div>
</div>

<style>
    .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        position: relative;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        position: relative;
    }

    .language-selector {
        position: fixed;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
        z-index: 10;
    }

    .language-selector button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 9999px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    }

    .language-selector button:hover {
        transform: translateY(-1px);
    }

    .card-wrapper {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }

    @media (max-width: 640px) {
        .app {
            padding: 1rem;
        }
    }
</style>

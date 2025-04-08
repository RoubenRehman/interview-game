<script lang="ts">
    import { onMount } from 'svelte';
    import { questionStore, loadQuestions, nextQuestion, setLanguage } from '$lib/stores/questions';
    import QuestionCard from '$lib/components/QuestionCard.svelte';
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
    import DotBackground from '$lib/components/DotBackground.svelte';
    import { theme } from '$lib/stores/theme';

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
    });
</script>

<div class="page">
    <DotBackground />
    <main>
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
        <div class="content">
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
</div>

<style>
    :global(html), :global(body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    :global(#svelte) {
        min-height: 100vh;
        width: 100%;
    }

    .page {
        position: relative;
        min-height: 100vh;
        width: 100%;
        background: var(--background-color);
    }

    main {
        position: relative;
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        z-index: 1;
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

    .content {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }

    @media (max-width: 640px) {
        main {
            padding: 1rem;
        }
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import { questionStore, loadQuestions, nextQuestion } from '$lib/stores/questions';
    import QuestionCard from '$lib/components/QuestionCard.svelte';
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
    import LanguageToggle from '$lib/components/LanguageToggle.svelte';
    import DotBackground from '$lib/components/DotBackground.svelte';
    import { theme } from '$lib/stores/theme';

    let currentQuestion = '';
    let currentLanguage = '';
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
        <div class="controls-left">
            <LanguageToggle />
        </div>
        <div class="controls-right">
            <ThemeToggle />
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

    .controls-left {
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 10;
    }

    .controls-right {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 10;
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

        .controls-left {
            top: 0.5rem;
            left: 0.5rem;
        }

        .controls-right {
            top: 0.5rem;
            right: 0.5rem;
        }
    }
</style>

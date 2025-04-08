<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { questionStore, loadQuestions, nextQuestion } from '$lib/stores/questions';
    import { timerStore } from '$lib/stores/timer';
    import QuestionCard from '$lib/components/QuestionCard.svelte';
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
    import LanguageToggle from '$lib/components/LanguageToggle.svelte';
    import DotBackground from '$lib/components/DotBackground.svelte';
    import { theme } from '$lib/stores/theme';

    let currentQuestion = '';
    let currentLanguage = '';
    let isTransitioning = false;
    let currentCategory = 1;
    let timerInterval: number;

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
        
        // Start timer when questions are loaded
        timerStore.start();

        // Set up timer interval
        timerInterval = setInterval(() => {
            timerStore.tick();
        }, 1000);
    });

    onDestroy(() => {
        // Clear interval when component is destroyed
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    });

    function handleTimerExpired() {
        // Stop the timer
        timerStore.stop();
    }

    function handleContinue() {
        // Reset timer and continue
        timerStore.reset();
        nextQuestion();
    }
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
        
        {#if $timerStore.isActive || $timerStore.isExpired}
            <div 
                class="timer" 
                style:color={$theme.colors.text}
                style:opacity={$timerStore.isExpired ? 0.5 : 1}
            >
                {#if $timerStore.isExpired}
                    Time's up!
                {:else}
                    {$timerStore.timeRemaining}s
                {/if}
            </div>
        {/if}

        <div class="content">
            {#if currentQuestion}
                <QuestionCard 
                    question={currentQuestion}
                    language={currentLanguage}
                    onNext={$timerStore.isExpired ? handleContinue : nextQuestion}
                    isTransitioning={isTransitioning}
                    category={currentCategory}
                    timerExpired={$timerStore.isExpired}
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

    .timer {
        position: fixed;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        font-size: 1.25rem;
        font-weight: 500;
        opacity: 0.7;
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

        .timer {
            font-size: 1rem;
        }
    }
</style>

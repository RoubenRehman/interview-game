<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    import { theme } from '$lib/stores/theme';
    import { questionStore } from '$lib/stores/questions';
    import { timerStore } from '$lib/stores/timer';

    export let onContinue: () => void;

    $: language = $questionStore.language;
    $: timeUpMessage = $questionStore.timeUpMessages?.[language] || {
        title: "Time's Up!",
        description: "What do you think?",
        button: "Continue"
    };

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            onContinue();
        }
    }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div 
    class="modal-overlay" 
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="time-up-title"
    tabindex="-1"
>
    <div 
        class="modal" 
        transition:scale={{ duration: 200, start: 0.9 }}
        style:background={$theme.colors.card}
        style:color={$theme.colors.text}
    >
        <h2 
            id="time-up-title" 
            style:color={$theme.colors.primary}
        >
            {timeUpMessage.title}
        </h2>
        <p>{timeUpMessage.description}</p>
        <button 
            on:click={onContinue}
            style:background={$theme.colors.primary}
        >
            {timeUpMessage.button}
        </button>
    </div>
</div>

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        backdrop-filter: blur(5px);
    }

    .modal {
        width: 90%;
        max-width: 400px;
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    h2 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    p {
        margin-bottom: 2rem;
        opacity: 0.8;
        line-height: 1.6;
    }

    button {
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 640px) {
        .modal {
            width: 95%;
            padding: 1.5rem;
        }

        h2 {
            font-size: 1.25rem;
        }

        button {
            padding: 0.5rem 1.25rem;
        }
    }
</style>

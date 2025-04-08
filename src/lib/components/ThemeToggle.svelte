<script lang="ts">
    import { theme, isDarkMode, toggleDarkMode } from '$lib/stores/theme';
    import { onMount } from 'svelte';

    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    function handleToggle() {
        // Add transition class
        document.body.classList.add('theme-switching');
        
        // Toggle theme
        toggleDarkMode();
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-switching');
        }, 300);
    }
</script>

<button 
    class="theme-toggle"
    class:mounted
    on:click={handleToggle}
    style:color={$theme.colors.text}
    aria-label={$isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
>
    <div class="icon-container">
        {#if !$isDarkMode}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        {/if}
    </div>
</button>

<style>
    .theme-toggle {
        position: fixed;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: inherit;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
        opacity: 0;
        transform: scale(0.8);
    }

    .theme-toggle.mounted {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.2s;
    }

    .theme-toggle:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    :global([data-theme="dark"]) .theme-toggle:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        position: relative;
    }

    svg {
        position: absolute;
        transition: transform 0.3s ease, opacity 0.2s ease;
    }

    :global([data-theme="dark"]) .theme-toggle svg {
        transform: rotate(360deg);
    }
</style>

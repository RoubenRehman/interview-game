<script lang="ts">
    import { setLanguage } from '$lib/stores/questions';
    import { theme } from '$lib/stores/theme';
    
    let isOpen = false;
    let dropdownRef: HTMLDivElement;

    type Language = 'en' | 'de';

    const languages: Array<{ code: Language; name: string }> = [
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' }
    ];

    function toggleDropdown() {
        isOpen = !isOpen;
    }

    function handleClickOutside(event: MouseEvent) {
        if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
            isOpen = false;
        }
    }

    function selectLanguage(code: Language) {
        setLanguage(code);
        isOpen = false;
    }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-toggle" bind:this={dropdownRef}>
    <button 
        class="toggle-button" 
        on:click={toggleDropdown}
        style:color={$theme.colors.text}
        aria-label="Change language"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            <path d="M2 12h20"/>
        </svg>
    </button>
    {#if isOpen}
        <div class="dropdown" style:background={$theme.colors.card} style:color={$theme.colors.text}>
            {#each languages as lang}
                <button 
                    class="dropdown-item"
                    on:click={() => selectLanguage(lang.code)}
                    style:color={$theme.colors.text}
                >
                    {lang.name}
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .language-toggle {
        position: relative;
    }

    .toggle-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        transition: all 0.3s ease;
    }

    .toggle-button:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    :global([data-theme="dark"]) .toggle-button:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        z-index: 100;
    }

    .dropdown-item {
        display: block;
        width: 100%;
        padding: 0.75rem 1.5rem;
        text-align: left;
        background: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .dropdown-item:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    :global([data-theme="dark"]) .dropdown-item:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
</style>

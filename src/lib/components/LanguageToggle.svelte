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
    >
        🌐
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
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }

    .toggle-button:hover {
        transform: scale(1.1);
    }

    .dropdown {
        position: absolute;
        top: 100%;
        right: 0;
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

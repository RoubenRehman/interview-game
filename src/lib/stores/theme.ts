import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface Theme {
    colors: {
        background: string;
        card: string;
        text: string;
        primary: string;
        disabled: string;
    };
    shadows: {
        card: string;
    };
    borderRadius: {
        card: string;
        button: string;
    };
}

const lightTheme: Theme = {
    colors: {
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ff 100%)',
        card: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
        text: '#2d3748',
        primary: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
        disabled: '#CBD5E0'
    },
    shadows: {
        card: '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.06)'
    },
    borderRadius: {
        card: '20px',
        button: '12px'
    }
};

const darkTheme: Theme = {
    colors: {
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        card: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
        text: '#f7fafc',
        primary: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
        disabled: '#4a5568'
    },
    shadows: {
        card: '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.1)'
    },
    borderRadius: {
        card: '20px',
        button: '12px'
    }
};

// Create the theme store
export const theme = writable<Theme>(lightTheme);

// Create dark mode store
export const isDarkMode = writable<boolean>(false);

// Initialize dark mode from system preference
if (browser) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkMode.set(prefersDark);
    theme.set(prefersDark ? darkTheme : lightTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        isDarkMode.set(e.matches);
        theme.set(e.matches ? darkTheme : lightTheme);
    });
}

// Function to toggle dark mode
export function toggleDarkMode() {
    isDarkMode.update(dark => {
        const newDark = !dark;
        theme.set(newDark ? darkTheme : lightTheme);
        return newDark;
    });
}

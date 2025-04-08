import { writable } from 'svelte/store';

interface Theme {
    colors: {
        primary: string;
        primaryHover: string;
        background: string;
        card: string;
        text: string;
        textLight: string;
        disabled: string;
    };
    shadows: {
        card: string;
        button: string;
    };
    borderRadius: {
        card: string;
        button: string;
    };
}

const lightTheme: Theme = {
    colors: {
        primary: '#4299e1',
        primaryHover: '#3182ce',
        background: '#f7fafc',
        card: '#ffffff',
        text: '#2d3748',
        textLight: '#ffffff',
        disabled: '#a0aec0'
    },
    shadows: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        button: '0 0 0 3px rgba(66, 153, 225, 0.5)'
    },
    borderRadius: {
        card: '1rem',
        button: '0.5rem'
    }
};

const darkTheme: Theme = {
    colors: {
        primary: '#4299e1',
        primaryHover: '#3182ce',
        background: '#1a202c',
        card: '#2d3748',
        text: '#f7fafc',
        textLight: '#ffffff',
        disabled: '#4a5568'
    },
    shadows: {
        card: '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
        button: '0 0 0 3px rgba(66, 153, 225, 0.5)'
    },
    borderRadius: {
        card: '1rem',
        button: '0.5rem'
    }
};

// Create the theme store
export const theme = writable<Theme>(lightTheme);

// Create a store for dark mode state
export const isDarkMode = writable<boolean>(false);

// Subscribe to dark mode changes
isDarkMode.subscribe(dark => {
    theme.set(dark ? darkTheme : lightTheme);
});

// Function to toggle dark mode
export function toggleDarkMode() {
    isDarkMode.update(dark => !dark);
}

// Function to update theme
export function updateTheme(newTheme: Partial<Theme>) {
    theme.update(currentTheme => ({
        ...currentTheme,
        ...newTheme
    }));
}

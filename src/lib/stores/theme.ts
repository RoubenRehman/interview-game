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

const defaultTheme: Theme = {
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

export const theme = writable<Theme>(defaultTheme);

// Function to update theme
export function updateTheme(newTheme: Partial<Theme>) {
    theme.update(currentTheme => ({
        ...currentTheme,
        ...newTheme
    }));
}

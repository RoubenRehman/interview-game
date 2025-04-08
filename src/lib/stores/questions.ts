import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface Question {
    id: string;
    category: number;
    translations: {
        en: string;
        de: string;
    };
}

interface Category {
    en: string;
    de: string;
}

interface QuestionStore {
    currentIndex: number;
    questions: Question[];
    categories: Record<string, Category>;
    language: 'en' | 'de';
    isTransitioning: boolean;
}

// Create the store with initial values
export const questionStore: Writable<QuestionStore> = writable({
    currentIndex: 0,
    questions: [],
    categories: {},
    language: 'en',
    isTransitioning: false
});

// Function to load questions from our JSON file
export async function loadQuestions() {
    try {
        const response = await fetch('/questions/questions.json');
        const data = await response.json();
        
        questionStore.update(store => ({
            ...store,
            questions: data.questions,
            categories: data.categories
        }));
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

// Function to get next question with fade transition
export async function nextQuestion() {
    questionStore.update(store => ({
        ...store,
        isTransitioning: true
    }));

    // Wait for fade out
    await new Promise(resolve => setTimeout(resolve, 200));

    questionStore.update(store => ({
        ...store,
        currentIndex: (store.currentIndex + 1) % store.questions.length,
    }));

    // Wait a bit before allowing next transition
    await new Promise(resolve => setTimeout(resolve, 100));

    questionStore.update(store => ({
        ...store,
        isTransitioning: false
    }));
}

// Function to change language
export function setLanguage(lang: 'en' | 'de') {
    questionStore.update(store => ({
        ...store,
        language: lang
    }));
}

// Function to get category name in current language
export function getCategoryName(categoryId: number, language: 'en' | 'de'): string {
    let store: QuestionStore | undefined;
    questionStore.subscribe(s => { store = s; })();
    
    if (!store) return '';
    return store.categories[categoryId]?.[language] || '';
}

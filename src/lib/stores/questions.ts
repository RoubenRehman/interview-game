import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface Question {
    id: string;
    translations: {
        en: string;
        de: string;
    };
}

interface QuestionStore {
    currentIndex: number;
    questions: Question[];
    language: 'en' | 'de';
}

// Create the store with initial values
export const questionStore: Writable<QuestionStore> = writable({
    currentIndex: 0,
    questions: [],
    language: 'en'
});

// Function to load questions from our JSON file
export async function loadQuestions() {
    try {
        const response = await fetch('/questions/questions.json');
        const data = await response.json();
        
        questionStore.update(store => ({
            ...store,
            questions: data.questions
        }));
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

// Function to get next question
export function nextQuestion() {
    questionStore.update(store => ({
        ...store,
        currentIndex: (store.currentIndex + 1) % store.questions.length
    }));
}

// Function to change language
export function setLanguage(lang: 'en' | 'de') {
    questionStore.update(store => ({
        ...store,
        language: lang
    }));
}

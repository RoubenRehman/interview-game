import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface Question {
    id: string;
    category: number;
    translations: Record<string, string>;
}

interface Category {
    [key: string]: string;
}

interface Languages {
    [key: string]: string;
}

interface TimeUpMessage {
    title: string;
    description: string;
    button: string;
}

interface TimeUpMessages {
    [key: string]: TimeUpMessage;
}

interface TimerConfig {
    duration: number;
    defaultLanguage: string;
    showTimer: boolean;
}

interface QuestionStore {
    currentIndex: number;
    questions: Question[];
    usedQuestionIds: string[];
    categories: Record<string, Category>;
    languages: Languages;
    timeUpMessages?: TimeUpMessages;
    timerConfig?: TimerConfig;
    language: string;
    isTransitioning: boolean;
    showTimer: boolean;
}

// Create the store with initial values
export const questionStore: Writable<QuestionStore> = writable({
    currentIndex: 0,
    questions: [],
    usedQuestionIds: [],
    categories: {},
    languages: {},
    language: 'en',
    isTransitioning: false,
    showTimer: false
});

// Function to load questions from our JSON file
export async function loadQuestions() {
    try {
        const response = await fetch('/questions/questions.json');
        const data = await response.json();
        
        // Set default language to first available language if current one isn't available
        const availableLanguages = Object.keys(data.languages);
        let defaultLanguage = data.timerConfig?.defaultLanguage || availableLanguages[0];
        
        questionStore.update(store => ({
            ...store,
            questions: data.questions,
            categories: data.categories,
            languages: data.languages,
            timeUpMessages: data.timeUpMessages,
            timerConfig: data.timerConfig,
            language: availableLanguages.includes(store.language) ? store.language : defaultLanguage,
            usedQuestionIds: [],
            showTimer: data.timerConfig?.showTimer ?? false
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

    questionStore.update(store => {
        // Filter out used questions
        const availableQuestions = store.questions.filter(
            q => !store.usedQuestionIds.includes(q.id)
        );

        // If all questions have been used, reset used questions
        if (availableQuestions.length === 0) {
            return {
                ...store,
                usedQuestionIds: [],
                currentIndex: Math.floor(Math.random() * store.questions.length),
                isTransitioning: false
            };
        }

        // Select a random question from available questions
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const selectedQuestion = availableQuestions[randomIndex];
        const newCurrentIndex = store.questions.findIndex(q => q.id === selectedQuestion.id);

        return {
            ...store,
            currentIndex: newCurrentIndex,
            usedQuestionIds: [...store.usedQuestionIds, selectedQuestion.id],
            isTransitioning: false
        };
    });
}

// Function to change language
export function setLanguage(lang: string) {
    questionStore.update(store => {
        // Only update if language exists
        if (store.languages[lang]) {
            return {
                ...store,
                language: lang
            };
        }
        return store;
    });
}

// Function to get category name in current language
export function getCategoryName(categoryId: number, language: string): string {
    let store: QuestionStore | undefined;
    questionStore.subscribe(s => { store = s; })();
    
    if (!store) return '';
    return store.categories[categoryId]?.[language] || '';
}

// Function to get available languages
export function getAvailableLanguages(): [string, string][] {
    let store: QuestionStore | undefined;
    questionStore.subscribe(s => { store = s; })();
    
    if (!store) return [];
    return Object.entries(store.languages);
}

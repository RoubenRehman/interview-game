import { writable } from 'svelte/store';
import { questionStore } from './questions';

export interface TimerStore {
    isActive: boolean;
    timeRemaining: number;
    duration: number;
    isExpired: boolean;
}

function createTimerStore() {
    // Helper function to get initial state from localStorage or default
    const getInitialState = (duration: number): TimerStore => {
        // Only use localStorage in browser environment
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('timerState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                // Only restore if not expired
                if (!parsedState.isExpired) {
                    return parsedState;
                }
            }
        }
        
        return {
            isActive: false,
            timeRemaining: duration,
            duration: duration,
            isExpired: false
        };
    };

    // Initial duration from questions store
    const initialDuration = 10; // Default to 10 seconds

    const { subscribe, set, update } = writable<TimerStore>(getInitialState(initialDuration));

    // Subscribe to question store to get timer configuration
    questionStore.subscribe(store => {
        const duration = store.timerConfig?.duration || initialDuration;
        update(timerStore => {
            const newState = {
                ...timerStore,
                duration,
                timeRemaining: timerStore.timeRemaining || duration
            };
            
            // Save to localStorage only in browser
            if (typeof window !== 'undefined') {
                localStorage.setItem('timerState', JSON.stringify(newState));
            }
            
            return newState;
        });
    });

    return {
        subscribe,
        start: (duration?: number) => {
            update(store => {
                const newState = {
                    ...store,
                    isActive: true,
                    timeRemaining: duration || store.duration,
                    isExpired: false
                };
                
                // Save to localStorage only in browser
                if (typeof window !== 'undefined') {
                    localStorage.setItem('timerState', JSON.stringify(newState));
                }
                
                return newState;
            });
        },
        tick: () => {
            update(store => {
                if (!store.isActive) return store;

                const newTimeRemaining = Math.max(0, store.timeRemaining - 1);
                const newState = {
                    ...store,
                    timeRemaining: newTimeRemaining,
                    isExpired: newTimeRemaining === 0,
                    isActive: newTimeRemaining > 0
                };
                
                // Save to localStorage only in browser
                if (typeof window !== 'undefined') {
                    localStorage.setItem('timerState', JSON.stringify(newState));
                }
                
                return newState;
            });
        },
        reset: () => {
            update(store => {
                const newState = {
                    ...store,
                    isActive: true,
                    timeRemaining: store.duration,
                    isExpired: false
                };
                
                // Save to localStorage only in browser
                if (typeof window !== 'undefined') {
                    localStorage.setItem('timerState', JSON.stringify(newState));
                }
                
                return newState;
            });
        },
        stop: () => {
            update(store => {
                const newState = {
                    ...store,
                    isActive: false,
                    isExpired: false
                };
                
                // Save to localStorage only in browser
                if (typeof window !== 'undefined') {
                    localStorage.setItem('timerState', JSON.stringify(newState));
                }
                
                return newState;
            });
        },
        pause: () => {
            update(store => {
                const newState = {
                    ...store,
                    isActive: false
                };
                
                // Save to localStorage only in browser
                if (typeof window !== 'undefined') {
                    localStorage.setItem('timerState', JSON.stringify(newState));
                }
                
                return newState;
            });
        },
        resume: () => {
            update(store => {
                const newState = {
                    ...store,
                    isActive: true
                };
                
                // Save to localStorage only in browser
                if (typeof window !== 'undefined') {
                    localStorage.setItem('timerState', JSON.stringify(newState));
                }
                
                return newState;
            });
        },
    };
}

export const timerStore = createTimerStore();

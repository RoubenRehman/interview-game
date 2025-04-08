import { writable } from 'svelte/store';
import { questionStore } from './questions';

export interface TimerStore {
    isActive: boolean;
    timeRemaining: number;
    duration: number;
    isExpired: boolean;
}

function createTimerStore() {
    const { subscribe, set, update } = writable<TimerStore>({
        isActive: false,
        timeRemaining: 0,
        duration: 600, // default 10 minutes
        isExpired: false
    });

    // Subscribe to question store to get timer configuration
    questionStore.subscribe(store => {
        const duration = store.timerConfig?.duration || 600;
        update(timerStore => ({
            ...timerStore,
            duration,
            timeRemaining: duration
        }));
    });

    return {
        subscribe,
        start: (duration?: number) => {
            update(store => ({
                ...store,
                isActive: true,
                timeRemaining: duration || store.duration,
                isExpired: false
            }));
        },
        tick: () => {
            update(store => {
                if (!store.isActive) return store;

                const newTimeRemaining = Math.max(0, store.timeRemaining - 1);
                return {
                    ...store,
                    timeRemaining: newTimeRemaining,
                    isExpired: newTimeRemaining === 0,
                    isActive: newTimeRemaining > 0
                };
            });
        },
        reset: () => {
            update(store => ({
                ...store,
                isActive: false,
                timeRemaining: store.duration,
                isExpired: false
            }));
        },
        stop: () => {
            update(store => ({
                ...store,
                isActive: false,
                isExpired: false
            }));
        }
    };
}

export const timerStore = createTimerStore();

import { writable } from 'svelte/store';

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
        duration: 15, // default 15 seconds
        isExpired: false
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

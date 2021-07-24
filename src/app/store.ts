import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import gameReducer                     from 'features/game';

export const store = configureStore({
    reducer:  {
        game: gameReducer,
    },
    devTools: true
});

export interface Action<T, V = never> {
    type: T
    payload?: V
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string, any>>;

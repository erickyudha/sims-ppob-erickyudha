import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer, { loadUserState } from "./userSlice";
import transactionReducer from './transactionSlice';
import informationReducer from './informationSlice';

export const store = configureStore({
  reducer: {
      user: userReducer,
      transaction: transactionReducer,
      information: informationReducer
  },
});

// Load user state from local storage when the application initializes
store.dispatch(loadUserState());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore, applyMiddleware, ThunkAction, Action, getDefaultMiddleware  } from '@reduxjs/toolkit'
import generatorReducer from './features/generator/generatorSlice'
import logger from 'redux-logger'

const middleware = getDefaultMiddleware({
  immutableCheck: true,
  serializableCheck: true,
  thunk: true,
})
  .concat(logger);
export const store = configureStore({
  reducer: {
    generator: generatorReducer
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
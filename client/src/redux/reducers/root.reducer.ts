import { combineReducers } from '@reduxjs/toolkit';

import animalsStateReducer from '../../features/AnimalDataSlice.ts';
import currentAnimalStateReducer from '../../features/AnimalDataSlice.ts';

export const rootReducer = combineReducers({
  animalsState: animalsStateReducer,
  currentAnimalState: currentAnimalStateReducer,
});

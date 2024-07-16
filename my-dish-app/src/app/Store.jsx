import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react'; // Import setupListeners
import { DishApi } from '../services/DishApi'; // Adjust the path based on your project structure
import { UserAuthApi } from '../services/UserAuthApi'; // Adjust the path based on your project structure

export const Store = configureStore({
  reducer: {
    [DishApi.reducerPath]: DishApi.reducer, // Add DishApi reducer
    [UserAuthApi.reducerPath]: UserAuthApi.reducer, // Add UserAuthApi reducer
    // Add other reducers if any
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(DishApi.middleware, UserAuthApi.middleware), // Add RTK-Query middleware
});

setupListeners(Store.dispatch); // Setup API event listeners

export default Store;

import { configureStore } from '@reduxjs/toolkit';

import customization from './customization';

export default configureStore({
  reducer: {
    customization: customization
  }
});

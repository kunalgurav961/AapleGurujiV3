import { configureStore } from "@reduxjs/toolkit";
import pujaReducer from "../features/Landing/state/pujaSlice.jsx";
import userReducer from "../features/Booking/state/userSlice.jsx";
const store = configureStore({
  reducer: {
    "puja": pujaReducer,
    "user": userReducer
  }
});
export default store
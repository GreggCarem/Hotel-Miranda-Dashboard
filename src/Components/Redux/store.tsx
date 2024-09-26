import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import bookingsReducer from "./Slice/bookingsSlice";
import roomsReducer from "./Slice/roomsSlice";
import contactsReducer from "./Slice/contactsSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    bookings: bookingsReducer,
    rooms: roomsReducer,
    contacts: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

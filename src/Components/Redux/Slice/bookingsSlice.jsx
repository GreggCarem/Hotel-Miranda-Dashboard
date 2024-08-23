import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  bookings: [],
  status: "idle",
  error: null,
};

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const response = await fetch("http://localhost:5003/bookings");
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    return response.json();
  }
);

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (booking) => {
    const newId = uuidv4();
    const newBooking = { ...booking, id: newId };

    const response = await fetch("http://localhost:5003/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    return response.json();
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async (booking) => {
    if (!booking.id) {
      throw new Error("Booking id is missing!");
    }

    const response = await fetch(
      `http://localhost:5003/bookings/${booking.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update booking");
    }

    return response.json();
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5003/bookings/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete booking: ${id} - ${response.statusText}`
        );
      }
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        );
      });
  },
});

export const selectAllBookings = (state) => state.bookings.bookings;
export const selectBookingsStatus = (state) => state.bookings.status;
export const selectBookingsError = (state) => state.bookings.error;

export default bookingsSlice.reducer;

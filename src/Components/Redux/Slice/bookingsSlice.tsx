import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "../../../Resources/Interface/booking";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";

interface BookingsState {
  bookings: Booking[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:3018";

export const fetchBookings = createAsyncThunk<
  Booking[],
  void,
  { rejectValue: string }
>("bookings/fetchBookings", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/bookings`);
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    const result = await response.json();
    return result.data as Booking[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const createBooking = createAsyncThunk<
  Booking,
  Omit<Booking, "id">,
  { rejectValue: string }
>("bookings/createBooking", async (booking, { rejectWithValue }) => {
  try {
    const newId = uuidv4();
    const newBooking: Booking = { ...booking, id: newId };

    const response = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    return (await response.json()) as Booking;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateBooking = createAsyncThunk<
  Booking,
  Booking,
  { rejectValue: string }
>("bookings/updateBooking", async (booking, { rejectWithValue }) => {
  if (!booking.id) {
    return rejectWithValue("Booking id is missing!");
  }

  try {
    const response = await fetch(`${API_URL}/bookings/${booking.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      throw new Error("Failed to update booking");
    }

    return (await response.json()) as Booking;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteBooking = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("bookings/deleteBooking", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete booking: ${id} - ${response.statusText}`
      );
    }
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBookings.fulfilled,
        (state, action: PayloadAction<Booking[]>) => {
          state.status = "succeeded";
          state.bookings = action.payload;
        }
      )
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch bookings";
      })

      .addCase(
        createBooking.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.bookings.push(action.payload);
          state.status = "succeeded";
        }
      )
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create booking";
      })

      .addCase(
        updateBooking.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          const index = state.bookings.findIndex(
            (booking) => booking.id === action.payload.id
          );
          if (index !== -1) {
            state.bookings[index] = action.payload;
          }
          state.status = "succeeded";
        }
      )
      .addCase(updateBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update booking";
      })

      .addCase(
        deleteBooking.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.bookings = state.bookings.filter(
            (booking) => booking.id !== action.payload
          );
          state.status = "succeeded";
        }
      )
      .addCase(deleteBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete booking";
      });
  },
});

export const selectAllBookings = (state: RootState): Booking[] =>
  state.bookings.bookings;
export const selectBookingsStatus = (
  state: RootState
): BookingsState["status"] => state.bookings.status;
export const selectBookingsError = (state: RootState): string | null =>
  state.bookings.error;

export default bookingsSlice.reducer;

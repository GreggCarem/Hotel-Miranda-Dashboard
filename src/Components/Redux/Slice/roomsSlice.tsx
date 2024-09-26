import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Room } from "../../../Resources/Interface/room";

interface RoomsState {
  rooms: Room[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RoomsState = {
  rooms: [],
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:3018";

export const fetchRooms = createAsyncThunk<
  Room[],
  void,
  { rejectValue: string }
>("rooms/fetchRooms", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/rooms`);
    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
export const createRoom = createAsyncThunk<
  Room,
  Partial<Room>,
  { rejectValue: string }
>("rooms/createRoom", async (room, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    });

    if (!response.ok) {
      throw new Error("Failed to create room");
    }

    return (await response.json()) as Room;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateRoom = createAsyncThunk<Room, Room, { rejectValue: string }>(
  "rooms/updateRoom",
  async (room, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/rooms/${room._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(room),
      });

      if (!response.ok) {
        throw new Error("Failed to update room");
      }

      return (await response.json()) as Room;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteRoom = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("rooms/deleteRoom", async (_id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/rooms/${_id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete room");
    }
    return _id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      })

      .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.rooms.push(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.error = action.payload || null;
      })

      .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        const index = state.rooms.findIndex(
          (room) => room._id === action.payload._id
        );
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.error = action.payload || null;
      })

      .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<string>) => {
        state.rooms = state.rooms.filter((room) => room._id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.error = action.payload || null;
      });
  },
});

export const selectAllRooms = (state: RootState): Room[] => state.rooms.rooms;
export const selectRoomsStatus = (state: RootState): RoomsState["status"] =>
  state.rooms.status;
export const selectRoomsError = (state: RootState): RoomsState["error"] =>
  state.rooms.error;

export default roomsSlice.reducer;

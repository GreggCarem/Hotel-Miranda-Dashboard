import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  status: "idle",
  error: null,
};

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetch("http://localhost:3000/rooms");
  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }
  return response.json();
});

export const createRoom = createAsyncThunk("rooms/createRoom", async (room) => {
  const response = await fetch("http://localhost:3000/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room),
  });

  if (!response.ok) {
    throw new Error("Failed to create room");
  }

  return response.json();
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (room) => {
  const response = await fetch(`http://localhost:3000/rooms/${room.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(room),
  });

  if (!response.ok) {
    throw new Error("Failed to update room");
  }

  return response.json();
});

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id) => {
  const response = await fetch(`http://localhost:3000/rooms/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete room");
  }
  return id;
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
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const index = state.rooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      });
  },
});

export const selectAllRooms = (state) => state.rooms.rooms;
export const selectRoomsStatus = (state) => state.rooms.status;
export const selectRoomsError = (state) => state.rooms.error;

export default roomsSlice.reducer;

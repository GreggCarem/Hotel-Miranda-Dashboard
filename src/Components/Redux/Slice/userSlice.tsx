import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../../Resources/Interface/users";
import { apiRequest } from "../api";

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await apiRequest("/users", "GET");
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const createUser = createAsyncThunk<
  User,
  Omit<User, "_id">,
  { rejectValue: string }
>("users/createUser", async (user, { rejectWithValue }) => {
  try {
    const data = await apiRequest("/users", "POST", user);
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>(
  "users/updateUser",
  async (user, { rejectWithValue }) => {
    if (!user._id) {
      throw new Error("User ID is missing!");
    }
    try {
      const data = await apiRequest(`/users/${user._id}`, "PUT", user);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await apiRequest(`/users/${id}`, "DELETE");
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch users";
      })

      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload || null;
      })

      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload || null;
      })

      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload || null;
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;

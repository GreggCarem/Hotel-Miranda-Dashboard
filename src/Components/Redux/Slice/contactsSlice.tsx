import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Contact } from "../../../Resources/Interface/contact";

interface ContactsState {
  contacts: Contact[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  status: "idle",
  error: null,
};

const API_URL = "http://localhost:3018";

export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("contacts/fetchContacts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/contacts`);
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.status = "succeeded";
          state.contacts = action.payload;
        }
      )
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  },
});

export const selectAllContacts = (state: RootState): Contact[] =>
  state.contacts.contacts;
export const selectContactsStatus = (
  state: RootState
): ContactsState["status"] => state.contacts.status;
export const selectContactsError = (state: RootState): string | null =>
  state.contacts.error;

export default contactsSlice.reducer;

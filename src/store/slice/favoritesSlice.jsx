import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

// Получение всех фаворитов
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/favorites");
      return res.data.items.map(item => item.product || item.accessory || item.supply);
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || "Error loading favorites");
    }
  }
);

// Переключение фаворита
export const toggleFavoriteItem = createAsyncThunk(
  "favorites/toggleFavoriteItem",
  async ({ itemType, itemId }, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(`/favorites/${itemType}/${itemId}/toggle/`);
      // После изменения обновляем список фаворитов
      dispatch(fetchFavorites());
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || "Error toggling favorite");
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => { state.loading = true; })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFavoriteItem.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default favoritesSlice.reducer;


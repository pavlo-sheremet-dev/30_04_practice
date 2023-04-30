import {
  addArticle,
  deleteArticle,
  fetchArticles,
  putArticle,
} from './operations';

const { createSlice } = require('@reduxjs/toolkit');

const handlePending = (state, action) => {
  state.isLoading = true;
  state.error = null;
};

const handleReject = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    editingItem: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    toggleEditItem: (state, action) => {
      state.editingItem = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticles.pending, handlePending)
      .addCase(addArticle.pending, handlePending)
      .addCase(putArticle.pending, handlePending)
      .addCase(deleteArticle.pending, handlePending)
      .addCase(fetchArticles.rejected, handleReject)
      .addCase(addArticle.rejected, handleReject)
      .addCase(putArticle.rejected, handleReject)
      .addCase(deleteArticle.rejected, handleReject)

      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })

      .addCase(addArticle.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.isLoading = false;
      })

      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.items = state.items.filter(
          article => article.id !== action.payload
        );
        state.isLoading = false;
      })

      .addCase(putArticle.fulfilled, (state, action) => {
        state.items = state.items.map(article =>
          article.id === action.payload.id ? action.payload : article
        );
        state.editingItem = null;
        state.isLoading = false;
      });
  },
});

export const articlesReducer = articlesSlice.reducer;
export const { toggleEditItem } = articlesSlice.actions;

const { createSlice } = require('@reduxjs/toolkit');

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    themeTitle: 'light',
  },
  reducers: {
    toggleThemeTitle: state => {
      state.themeTitle = state.themeTitle === 'light' ? 'dark' : 'light';
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { toggleThemeTitle } = globalSlice.actions;

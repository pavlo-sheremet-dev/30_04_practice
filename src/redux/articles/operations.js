import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const articleApi = axios.create({
  baseURL: 'https://644e37394e86e9a4d8f36e2b.mockapi.io/api',
});

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, thunkApi) => {
    try {
      const response = await articleApi.get('/articles');

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('error text');
    }
  }
);

export const addArticle = createAsyncThunk(
  'articles/addArticle',
  async (articleData, thunkApi) => {
    try {
      const response = await articleApi.post('/articles', articleData);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('error text');
    }
  }
);

export const putArticle = createAsyncThunk(
  'articles/putArticle',
  async (articleData, thunkApi) => {
    try {
      const response = await articleApi.put(
        `/articles/${articleData.id}`,
        articleData
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('error text');
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (id, thunkApi) => {
    try {
      await articleApi.delete(`/articles/${id}`);

      return id;
    } catch (error) {
      return thunkApi.rejectWithValue('error text');
    }
  }
);

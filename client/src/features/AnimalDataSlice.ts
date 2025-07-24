import axios from 'axios';

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../redux/store/store.ts';

const api = import.meta.env.VITE_API_URL;

export interface Animal {
  id: number;
  imageURL: string;
  comment: string;
  isCat: boolean;
  isLike: boolean;
}

export interface AnimalsState {
  animals: Animal[];
  currentAnimal: Animal | null;
  error: string;
  loading: boolean;
}

const initialState: AnimalsState = {
  animals: [],
  currentAnimal: null,
  error: '',
  loading: false,
};

interface CatResponseData {
  url: string;
}

interface DogResponeData {
  message: string;
}

interface ApiError {
  message: string;
  status: number;
}

interface NewAnimal {
  imageURL: string;
  comment: string;
  isCat: boolean;
  isLike: boolean;
}

export const fetchAllAnimals = createAsyncThunk<
  Animal[],
  void,
  { rejectValue: ApiError }
>('animals/fetchAllAnimals', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Animal[]>(`${api}/animals`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Неизвестная ошибка',
        status: error.response?.status || 500,
      });
    }
    return rejectWithValue({ message: 'Неизвестная ошибка', status: 503 });
  }
});

export const fetchRandomCat = createAsyncThunk<
  CatResponseData,
  void,
  { rejectValue: ApiError }
>('cats/fetchRandom', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<CatResponseData[]>(
      'https://api.thecatapi.com/v1/images/search?size=full'
    );
    return response.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Неизвестная ошибка',
        status: error.response?.status || 500,
      });
    }
    return rejectWithValue({ message: 'Неизвестная ошибка', status: 503 });
  }
});

export const fetchRandomDog = createAsyncThunk<
  DogResponeData,
  void,
  { rejectValue: ApiError }
>('dogs/fetchRandom', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Неизвестная ошибка',
        status: error.response?.status || 500,
      });
    }
    return rejectWithValue({
      message: 'Ошибка при получении собаки',
      status: 503,
    });
  }
});

export const addAnimal = createAsyncThunk<
  void,
  NewAnimal,
  { rejectValue: ApiError }
>('animal/addAnimal', async (animalData, { rejectWithValue }) => {
  try {
    await axios.post<NewAnimal>(`${api}/animals`, animalData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Неизвестная ошибка',
        status: error.response?.status || 500,
      });
    }
    return rejectWithValue({
      message: 'Ошибка при добавлении животного',
      status: 503,
    });
  }
});

export const AnimalsStateSlice = createSlice({
  name: 'animalsData',
  initialState: initialState,
  reducers: {
    changeLikeStatus: (state, action) => {
      if (state.currentAnimal) {
        state.currentAnimal.isLike = action.payload;
      }
    },
    addComment: (state, action) => {
      if (state.currentAnimal) {
        state.currentAnimal.comment = action.payload;
      }
    },
    addRandomAnimal: (state, action) => {
      state.currentAnimal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAllAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          'Произошла неизвестная ошибка при загрузке';
      })
      .addCase(fetchRandomCat.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchRandomCat.fulfilled,
        (state, action: PayloadAction<CatResponseData>) => {
          state.loading = false;
          state.currentAnimal = {
            imageURL: action.payload.url,
            comment: '',
            isCat: true,
          };
        }
      )
      .addCase(fetchRandomCat.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          'Произошла неизвестная ошибка при загрузке котика';
      })
      .addCase(fetchRandomDog.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomDog.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAnimal = {
          imageURL: action.payload.message,
          comment: '',
          isCat: false,
        };
      })
      .addCase(fetchRandomDog.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          'Произошла неизвестная ошибка при загрузке собачки';
      })
      .addCase(addAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAnimal.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          'Произошла неизвестная ошибка при добавлении';
      });
  },
});

export const { changeLikeStatus, addComment, addRandomAnimal } =
  AnimalsStateSlice.actions;
export default AnimalsStateSlice.reducer;
export const selectAnimalsState = (state: RootState) =>
  state.animalsState || initialState;
export const selectCurrentAnimal = (state: RootState) =>
  state.animalsState.currentAnimal;

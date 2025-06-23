import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../redux/store/store.ts';

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
  height: number;
  id: string;
  url: string;
  width: number;
}

interface DogResponeData {
  message: string;
  status: string;
}

interface AnimalsResponseData {
  id: number;
  imageURL: string;
  comment: string;
  isCat: boolean;
  isLike: boolean;
}

export const fetchAllAnimals = createAsyncThunk(
  'animals/fetchAllAnimals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5001/animals');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при загрузки Animals из БД'
      );
    }
  }
);

export const fetchRandomCat = createAsyncThunk(
  'cats/fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://api.thecatapi.com/v1/images/search?size=full'
      );
      return response.data[0];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при получения кота из АПИ'
      );
    }
  }
);

export const fetchRandomDog = createAsyncThunk(
  'dogs/fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://dog.ceo/api/breeds/image/random'
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при получении собаки из АПИ'
      );
    }
  }
);

export const addAnimal = createAsyncThunk(
  'animal/addAnimal',
  async (
    {
      imageURL,
      comment,
      isCat,
      isLike,
    }: { imageURL: string; comment: string; isCat: boolean; isLike: boolean },
    { rejectWithValue }
  ) => {
    try {
      await axios.post('http://localhost:5001/animals', {
        imageURL,
        comment,
        isCat,
        isLike,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка добавления животного в БД'
      );
    }
  }
);

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
      .addCase(
        fetchAllAnimals.fulfilled,
        (state, action: PayloadAction<AnimalsResponseData[]>) => {
          state.loading = false;
          state.animals = action.payload;
        }
      )
      .addCase(
        fetchAllAnimals.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchRandomCat.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchRandomCat.fulfilled,
        (state, action: PayloadAction<CatResponseData>) => {
          state.loading = false;
          state.currentAnimal = {
            id: null,
            imageURL: action.payload.url,
            comment: '',
            isCat: true,
            isLike: null,
          };
        }
      )
      .addCase(fetchRandomDog.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchRandomDog.fulfilled,
        (state, action: PayloadAction<DogResponeData>) => {
          state.loading = false;
          state.currentAnimal = {
            id: null,
            imageURL: action.payload.message,
            comment: '',
            isCat: false,
            isLike: null,
          };
        }
      )
      .addCase(
        fetchRandomDog.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        fetchRandomCat.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(addAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAnimal.fulfilled, (state) => {
        state.loading = false;
        state.currentAnimal = initialState.currentAnimal;
      })
      .addCase(addAnimal.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload;
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

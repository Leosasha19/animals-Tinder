import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../redux/store/store.ts";

export interface Animal {
 id: string | null;
 imageURL: string;
 comment: string;
 isACat: boolean | null;
 like: boolean | null;
}

export interface AnimalsState {
 animals: Animal[];
 currentAnimal: Animal;
 error: string | null;
 loading: boolean;
}

const initialState: AnimalsState = {
 animals: [],
 currentAnimal: {id: null, imageURL: "", comment: "", isACat: null, like: null},
 error: null,
 loading: false,
}

export const getAnimals = createAsyncThunk("animals/getAnimals",
    async (_,{rejectWithValue}) => {
    try {
     const response = await axios.get("http://localhost:5001/animals")
     return response.data;
    } catch (error) {
     return rejectWithValue(error.response?.data || "Ошибка при загрузки Animals из БД");
    }})

export const getCatApi = createAsyncThunk("cats/getCatsApi",
   async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/images/search?size=full")
        return response.data[0];
    } catch (error) {
        return rejectWithValue(error.response?.data || "Ошибка при получения кота из АПИ")
    }})

export const getDogApi = createAsyncThunk("dogs/getDogsApi",
    async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get("https://dog.ceo/api/breeds/image/random")
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Ошибка при получении собаки из АПИ")
    }
    })

export const addAnimal = createAsyncThunk("animal/addAnimal",
    async ({imageURL, comment, isACat, like}: {imageURL:string, comment:string, isACat:boolean, like: boolean}, {rejectWithValue}) => {
        try {
            await axios.post("http://localhost:5001/animals", {
                imageURL,
                comment,
                isACat,
                like
            })
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка добавления животного в БД")
        }
    })

export const AnimalsStateSlice = createSlice({
   name: "animalsData",
  initialState: initialState,
  reducers : {
       changeLikeStatus: (state, action) => {
           state.currentAnimal.like = action.payload;
       },
      addComment: (state, action) => {
           state.currentAnimal.comment = action.payload;
      },
      addRandomAnimal: (state, action) => {
           state.currentAnimal.id = action.payload.id;
           state.currentAnimal.imageURL = action.payload.imageURL;
           state.currentAnimal.comment = action.payload.comment;
           state.currentAnimal.isACat = action.payload.isACat;
           state.currentAnimal.like = action.payload.like;
      }
  },
 extraReducers: (builder) => {
    builder
        .addCase(getAnimals.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAnimals.fulfilled, (state, action) => {
            state.loading = false;
            state.animals = action.payload
     })
        .addCase(getAnimals.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(getCatApi.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCatApi.fulfilled, (state, action) => {
            state.loading = false;
            state.currentAnimal = {
                id : action.payload.id,
                imageURL: action.payload.url,
                comment: '',
                isACat: true,
                like: null,
            };
        })
        .addCase(getDogApi.pending, (state) => {
            state.loading = true;
        })
        .addCase(getDogApi.fulfilled, (state, action) => {
            state.loading = false;
            state.currentAnimal = {
                id: null,
                imageURL: action.payload.message,
                comment: '',
                isACat: false,
                like: null,
            }
        })
        .addCase(getDogApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(getCatApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(addAnimal.pending, (state) => {
            state.loading = true;
        })
        .addCase(addAnimal.fulfilled, (state) => {
            state.loading = false;
            state.currentAnimal = initialState.currentAnimal;
        })
        .addCase(addAnimal.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
 }
})

export const {changeLikeStatus, addComment, addRandomAnimal} = AnimalsStateSlice.actions;
export default AnimalsStateSlice.reducer;
export const selectAnimalsState = (state: RootState) => state.animalsState || initialState;
export const selectCurrentAnimal = (state: RootState) => state.currentAnimalState.currentAnimal;
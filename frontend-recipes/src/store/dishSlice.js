import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "utils/Api.js";

export const fetchDish = createAsyncThunk("dish", async (id) => {
  try {
    const dish = await client.get('dishes/' + id);
    return dish.data;
  } catch (e) {
    throw Error(e.message);
  }
})

export const fetchMeasures = createAsyncThunk("measures", async () => {
  try {
    const measures = await client.get('measures');
    return measures.data;
  } catch (e) {
    throw Error(e.message);
  }
});

export const fetchIngredients = createAsyncThunk("ingredients", async () => {
  try {
    const ingredients = await client.get('ingredients');
    return ingredients.data;
  } catch (e) {
    throw Error(e.message);
  }
});

export const fetchDishes = createAsyncThunk("dishes", async ({start, items}) => {
  try {
    const dishes = await client.get("dishes" , {start, items});
    return dishes.data;
  } catch (e) {
    throw Error(e.message);
  }
})


export const getDishesCount = createAsyncThunk("dishes_count", async () => {
  try {
    const res = await client.get("dishes_count");
    return res.data.count;
  } catch (e) {
    throw Error(e.message);
  }
})



const dishSlice = createSlice({
  name: "dishes",
  initialState: {
    dishes: [],
    measures: [],
    ingredients: [],
    status: 'idle',
  },

  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchMeasures.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.measures = action.payload;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.ingredients = action.payload;
    });

    builder.addCase(fetchDishes.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.dishes = action.payload;
    });
  }
})

export default dishSlice.reducer;


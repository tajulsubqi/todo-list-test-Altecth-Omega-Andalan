import AsyncStorage from "@react-native-async-storage/async-storage"
import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Todo, TodosState } from "../../interface"

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const storedCategories = await AsyncStorage.getItem("categories")
    if (storedCategories !== null) {
      return JSON.parse(storedCategories)
    } else {
      return []
    }
  },
)

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory) => {
    // Ambil data kategori yang sudah ada dari AsyncStorage
    const storedCategories = await AsyncStorage.getItem("categories")
    let categories = []
    if (storedCategories !== null) {
      categories = JSON.parse(storedCategories)
    }
    categories.push(newCategory)

    // Simpan kembali array kategori yang sudah diperbarui ke AsyncStorage
    await AsyncStorage.setItem("categories", JSON.stringify(categories))
    return categories
  },
)

export const deletedCategory = createAsyncThunk(
  "categories/deletedCategory",
  async (deletedCategory: string) => {
    const storedCategories = await AsyncStorage.getItem("categories")
    let categories: string[] = []

    // Jika ada kategori yang tersimpan, parse menjadi array
    if (storedCategories !== null) {
      categories = JSON.parse(storedCategories)
    }

    // Buat array baru tanpa kategori yang dihapus
    const newCategories = categories.filter(
      (category: string) => category !== deletedCategory,
    )

    await AsyncStorage.setItem("categories", JSON.stringify(newCategories))
    return newCategories
  },
)

export const createList = createAsyncThunk<
  Todo[],
  { title: string; description: string; category: string },
  { rejectValue: string }
>("lists/createList", async ({ title, description, category }, thunkAPI) => {
  const existingData = await AsyncStorage.getItem("lists")
  let lists: any[] = []
  if (existingData !== null) {
    lists = JSON.parse(existingData)
  }

  lists.push({ title, description, category })
  await AsyncStorage.setItem("lists", JSON.stringify(lists))
  return lists
})

export const getLists = createAsyncThunk("lists/getLists", async () => {
  const storedLists = await AsyncStorage.getItem("lists")
  if (storedLists !== null) {
    return JSON.parse(storedLists)
  } else {
    return []
  }
})

export const deleteList = createAsyncThunk("lists/deleteList", async (title: string) => {
  const lists = await AsyncStorage.getItem("lists")
  if (lists) {
    const updatedLists = JSON.parse(lists).filter((item: any) => item.title !== title)
    await AsyncStorage.setItem("lists", JSON.stringify(updatedLists))
    return updatedLists
  }
})

const initialState: TodosState = {
  todos: [],
  categories: [],
  loading: false,
}

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.loading = false
      })

      // Add category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories = action.payload
      })

      // Delete category
      .addCase(deletedCategory.fulfilled, (state, action) => {
        state.categories = action.payload
      })

      // Add list
      .addCase(createList.fulfilled, (state, action) => {
        state.todos = action.payload
      })

      // Get lists
      .addCase(getLists.fulfilled, (state, action) => {
        state.todos = action.payload
      })

      // Remove list
      .addCase(deleteList.fulfilled, (state, action) => {
        state.todos = action.payload
      })
  },

  reducers: {},
})

export default todoSlice.reducer

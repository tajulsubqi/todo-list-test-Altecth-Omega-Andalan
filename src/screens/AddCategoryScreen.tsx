import React, { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import Container from "../layout"
import tw from "twrnc"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { Ionicons } from "@expo/vector-icons"
import { createCategory, fetchCategories } from "../features/todos/todosSlice"
import { useAppDispatch, useAppSelector } from "../libs/Store"
import CategoriesList from "../components/CategoriesList"

const AddCategoryScreen = () => {
  const dispatch = useAppDispatch()
  const categoriesData = useAppSelector((state) => state.app.categories)
  const [categoryName, setCategoryName] = useState<string | undefined>("")

  const handleAddCategory = () => {
    if (categoryName.trim() === "") {
      console.error("Category name cannot be empty")
      return
    }

    dispatch(createCategory(categoryName))
    setCategoryName("")
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <Container>
      <View style={tw`relative`}>
        <Text style={tw`text-2xl text-center font-bold`}>Add Category</Text>

        <Pressable style={tw`absolute`}>
          <Ionicons name="chevron-back-sharp" size={24} color="black" />
        </Pressable>
      </View>

      <View style={tw`w-full flex gap-4 my-5`}>
        <Input
          placeholder="Category name"
          value={categoryName}
          onChange={setCategoryName}
        />
        <Button label="Add Category" onPress={handleAddCategory} />
      </View>

      <View style={tw`mt-10 `}>
        <Text style={tw`text-xl font-bold`}>List Category</Text>

        <CategoriesList categoriesData={categoriesData} />
      </View>
    </Container>
  )
}
export default AddCategoryScreen

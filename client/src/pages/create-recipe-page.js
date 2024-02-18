import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/getUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients]; // Create a copy of the array
    ingredients[index] = value;

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients,
    }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };
  const addIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ""],
    }));
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (userID === null) {
      return alert("login to create recipes"), navigate("/auth");
    }
    try {
      await axios.post("http://localhost:3003/recipes", recipe, {
        headers: { Authorization: cookies.access_token },
      });
      alert("recipe created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log(recipe);
  };
  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form action=''>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          onChange={handleChange}
        />
        <label htmlFor='Ingredients'>Ingredients</label>
        <button
          onClick={addIngredient}
          type='button'
        >
          Add Ingredient
        </button>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type='text'
            value={ingredient}
            name='ingredients'
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <label htmlFor='instructions'>Instructions</label>
        <textarea
          name='instructions'
          id='instructions'
          cols='30'
          rows='10'
          onChange={handleChange}
        ></textarea>
        <label htmlFor='imageUrl'>ImageUrl</label>
        <input
          type='text'
          id='imageUrl'
          name='imageUrl'
          onChange={handleChange}
        />
        <label htmlFor='cookingTime'>Cooking Time (mints)</label>
        <input
          type='number'
          id='cookingTime'
          name='cookingTime'
          onChange={handleChange}
        />
        <button
          type='submit'
          onClick={handleOnSubmit}
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;

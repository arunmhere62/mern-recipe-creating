import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import { useGetUserID } from "../hooks/getUserId";
import { useCookies } from "react-cookie";
const Home = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3003/recipes");
        setRecipes(response.data);
        console.log((await response).data);
      } catch (error) {
        console.error("error is", error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/recipes/savedRecipes/ids/${userID}`);
        console.log((await response).data);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error("error is", error);
      }
    };
    fetchRecipe();
    if (cookies.access_token) {
      fetchSavedRecipe();
    }
  }, []);

  const handleSaveRecipe = async (recipeID) => {
    if (!cookies.access_token) {
      return alert("login to save");
    }
    try {
      const response = await axios.put(
        "http://localhost:3003/recipes",
        {
          recipeID,
          userID,
        },
        {
          headers: { Authorization: cookies.access_token },
        }
      );
      setSavedRecipes(response.data.savedRecipes);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>home</h1>
      <div>
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className='recipe-card'
          >
            <img
              src={recipe.imageUrl}
              alt=''
            />
            <br />
            <button
              disabled={isRecipeSaved(recipe._id)}
              onClick={() => handleSaveRecipe(recipe._id)}
            >
              {isRecipeSaved(recipe._id) ? "saved" : "save"}
            </button>

            <p>{recipe.name}</p>
            <p>
              {recipe.ingredients.map((ingredient) => (
                <span key={ingredient.id}>{ingredient},</span>
              ))}
            </p>
            <p>{recipe.instructions}</p>
            <p>{recipe.cookingTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

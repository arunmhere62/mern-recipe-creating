import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import { useGetUserID } from "../hooks/getUserId";

const SavedRecipe = () => {
  const userID = useGetUserID();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
        console.log((await response).data.savedRecipes);
      } catch (error) {
        console.error("error is", error);
      }
    };

    fetchRecipe();
  }, []);

  return (
    <div>
      <h1>SavedRecipe</h1>
      <div>
        {savedRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className='recipe-card'
          >
            <img
              src={recipe.imageUrl}
              alt=''
            />
            <br />

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

export default SavedRecipe;

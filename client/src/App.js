import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth";
import CreateRecipe from "./pages/create-recipe-page";
import SavedRecipe from "./pages/saved-recipe";
import Navbar from "./components/navbar";
import "./App.css";
const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/auth'
            element={<Auth />}
          />
          <Route
            path='/create-recipe'
            element={<CreateRecipe />}
          />
          <Route
            path='/saved-recipe'
            element={<SavedRecipe />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

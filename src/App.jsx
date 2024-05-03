import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import Header from "./Components/Header";
import CreateRecipe from "./Pages/CreateRecipe";
import EditRecipe from "./Pages/EditRecipe";
import SearchByMainDish from "./Pages/SearchByMainDish";
import SearchByIngredients from "./Pages/SearchByIngredients";
import UserRecipes from "./Pages/UserRecipes";
import ViewRecipe from "./Pages/ViewRecipe";
import WishList from "./Pages/WishList";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewRecipe/:id" element={<ViewRecipe />} />
        <Route path="/searchbymaindish" element={<SearchByMainDish />} />
        <Route path="/searchbyingredients" element={<SearchByIngredients />} />
        <Route path="/myrecipes" element={<UserRecipes />} />
        <Route path="/mywishlist" element={<WishList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addRecipe" element={<CreateRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </>
  );
}

export default App;

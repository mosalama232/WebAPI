import { Alert, Button, IconButton, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoadingRecipe from "../Components/LoadingRecipe";
import RecipeCard from "../Components/RecipeCard";
const SearchByOptions = () => {
  const [ingredientSearchQuery, setIngredientSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/recipes/get/randomRecipes")
      .then((res) => {
        console.log(res);
        setRecipes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const data = await response.json();
        const ingredients = data.meals.map(
          (ingredient) => ingredient.strIngredient
        );
        setAvailableIngredients(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();
  }, []);

  const handleIngredientChange = (e) => {
    const query = e.target.value;
    setIngredientSearchQuery(query);
    const filtered = availableIngredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };

  const handleIngredientSelect = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      return;
    }
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setIngredientSearchQuery("");
  };

  const handleRemoveIngredient = (ingredient) => {
    const updatedIngredients = selectedIngredients.filter(
      (item) => item !== ingredient
    );
    setSelectedIngredients(updatedIngredients);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = () => {
    if (selectedIngredients.length === 0) {
      setOpen(true);
      return;
    }
    setIsLoading(true);

    axios
      .post("http://localhost:4000/api/recipes/search/ingredients", {
        ingredients: selectedIngredients,
      })
      .then((res) => {
        setRecipes(res.data);
        setIsLoading(false);
      });
  };

  return (
    <div
      className="container"
      style={{
        paddingTop: "15px",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              X
            </IconButton>
          }
        >
          Please select at least one ingredient
        </Alert>
      </Snackbar>
      <div className="p-3 rounded shadow-sm w-100">
        <Row className="mb-4">
          <Col>
            <h2 className="text-xl font-semibold mb-3">Select Ingredients</h2>
            <div className="d-flex align-items-center gap-4">
              <TextField
                type="text"
                fullWidth
                label="Search ingredients..."
                value={ingredientSearchQuery}
                onChange={handleIngredientChange}
              />
              <Button
                onClick={handleSearch}
                className="ml-2"
                variant="outlined"
              >
                Search
              </Button>
            </div>
            {ingredientSearchQuery && (
              <ul className="list-unstyled">
                {filteredIngredients.slice(0, 6).map((ingredient, index) => (
                  <li
                    key={index}
                    onClick={() => handleIngredientSelect(ingredient)}
                    className="cursor-pointer mb-2"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}
            {selectedIngredients.length > 0 && (
              <div className="mb-3 d-flex gap-1">
                {selectedIngredients.map((ingredient, index) => (
                  <Button
                    key={index}
                    onClick={() => handleRemoveIngredient(ingredient)}
                    variant="text"
                    className="mr-2 mb-2"
                  >
                    {ingredient}
                  </Button>
                ))}
              </div>
            )}
          </Col>
        </Row>

        <Col className="d-flex justify-content-between w-full"></Col>
      </div>

      <Container className="mt-5">
        <Row className="mt-3 d-flex justify-content-between gap-4">
          {isLoading ? (
            <LoadingRecipe />
          ) : (
            recipes.map((recipe, index) => {
              return (
                <RecipeCard
                  key={index}
                  id={recipe.uri ? recipe.uri : recipe._id}
                  title={recipe.label}
                  rating={recipe.rating ? recipe.rating : 0}
                  imageUrl={
                    recipe.images ? recipe.images.REGULAR.url : recipe.image
                  }
                />
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
};

export default SearchByOptions;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../Components/RecipeCard";
import LoadingRecipe from "../Components/LoadingRecipe";
import { Button, TextField } from "@mui/material";

const SearchByMainDish = () => {
  const [searchValue, setSearchValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSearch = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:4000/api/recipes/search/mainDish", {
        search: searchValue,
      })
      .then((res) => {
        console.log(res);
        setRecipes(res.data);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2 className="text-center">Search By Main Dish</h2>
          </Col>
        </Row>
        <Row className="mt-3 align-items-center">
          <Col>
            <TextField
              type="text"
              fullWidth
              label="Enter main dish"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
          <Col xs="auto" className="mt-3 mt-sm-0">
            <Button variant="contained" onClick={handleSearch} block>
              Search
            </Button>
          </Col>
        </Row>
      </Container>

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

export default SearchByMainDish;

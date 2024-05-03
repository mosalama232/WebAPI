import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../Components/RecipeCard";
import LoadingRecipe from "../Components/LoadingRecipe";

const HomePage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [recipes, setRecipes] = useState([]);

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

  return (
    <div>
      <Container className="mt-5 text-center">
        <Row>
          <Col>
            <h1 className="mb-5">Find your Favorite Recipe</h1>
            <h1 className="mb-5">All in one place</h1>
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

export default HomePage;

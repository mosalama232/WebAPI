import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../Components/RecipeCard";
import { Button } from "@mui/material";
import LoadingRecipe from "../Components/LoadingRecipe";

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      Authorization: `${localStorage.getItem("token")}`,
    };

    axios
      .post("http://localhost:4000/api/recipes/recipe/forUser", {}, { headers })
      .then((res) => {
        console.log(res);
        setRecipes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = (id) => {
    const headers = {
      Authorization: `${localStorage.getItem("token")}`,
    };
    axios
      .delete(`http://localhost:4000/api/recipes/${id}`, { headers })
      .then((res) => {
        console.log(res);
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container
      style={{
        padding: "5%",
      }}
    >
      <Row className="mb-5">
        <Col>
          <h2 className="text-center">Your Recipes</h2>
        </Col>
        <Col className="text-center">
          <Button variant="contained" onClick={() => navigate("/addRecipe")}>
            Create New Recipe
          </Button>
        </Col>
      </Row>
      <Row>
        {isLoading ? (
          <LoadingRecipe />
        ) : (
          recipes.map((recipe, index) => (
            <React.Fragment key={index}>
              <Col md={4}>
                <RecipeCard
                  key={index}
                  id={recipe.uri ? recipe.uri : recipe._id}
                  title={recipe.label}
                  rating={recipe.rating ? recipe.rating : 0}
                  imageUrl={
                    recipe.images ? recipe.images.REGULAR.url : recipe.image
                  }
                />
                <div className="d-flex justify-content-around mt-4">
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(recipe._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(recipe._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </React.Fragment>
          ))
        )}
      </Row>
    </Container>
  );
};

export default UserRecipes;

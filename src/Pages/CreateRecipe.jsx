import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const CreateRecipe = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [healthLabels, setHealthLabels] = useState("");
  const [ingredientLines, setIngredientLines] = useState("");
  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const headers = {
      Authorization: `${localStorage.getItem("token")}`,
    };
    const recipe = {
      name,
      image,
      totalTime,
      healthLabels: healthLabels.split(","),
      ingredientLines: ingredientLines.split(","),
      calories,
      totalNutrients: {
        FAT: {
          label: "Fat",
          quantity: fat,
          unit: "g",
        },
        CHOCDF: {
          label: "Carbs",
          quantity: carbs,
          unit: "g",
        },
        PROCNT: {
          label: "Protein",
          quantity: protein,
          unit: "g",
        },
      },
    };

    axios
      .post("http://localhost:4000/api/recipes", recipe, { headers })
      .then((res) => {
        console.log(res);
        navigate("/myrecipes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2 className="text-center">Create Recipe</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 mb-4">
        <Col xs={12} md={6}>
          <Form>
            <Form.Group className="mb-4">
              <TextField
                fullWidth
                type="text"
                label="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <TextField
                fullWidth
                type="text"
                label="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <TextField
                fullWidth
                type="number"
                label="Enter total time"
                value={totalTime}
                onChange={(e) => setTotalTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <TextField
                fullWidth
                type="text"
                label="Enter health labels separated by commas"
                value={healthLabels}
                onChange={(e) => setHealthLabels(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <TextField
                fullWidth
                type="text"
                label="Enter ingredient lines separated by commas"
                value={ingredientLines}
                onChange={(e) => setIngredientLines(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <TextField
                fullWidth
                type="number"
                label="Enter calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <TextField
                fullWidth
                type="number"
                label="Enter fat"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <TextField
                fullWidth
                type="number"
                label="Enter carbs"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <TextField
                fullWidth
                type="number"
                label="Enter protein"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </Form.Group>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateRecipe;

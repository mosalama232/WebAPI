import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import RecipeCard from "../Components/RecipeCard";

const WishList = () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col className="text-center">
            <h1>Your WishList</h1>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <Row className="mt-3 d-flex justify-content-between gap-4">
          {wishlist.length === 0 ? (
            <h3 className="text-center">No recipes in your wishlist</h3>
          ) : (
            wishlist.map((recipe, index) => {
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
    </>
  );
};

export default WishList;

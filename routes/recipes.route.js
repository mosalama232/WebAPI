const router = require("express").Router();
const recipeController = require("../controllers/recipe.controller.js");
const validateToken = require("../middleware/validateToken");

router.get("/", recipeController.getRecipes);
router.post("/:id", recipeController.getRecipe);

router.post("/", validateToken, recipeController.createRecipe);
router.patch("/update", validateToken, recipeController.updateRecipe);
router.delete("/:id", validateToken, recipeController.deleteRecipe);

router.post("/search/mainDish", recipeController.searchByMainDish);
router.post("/search/ingredients", recipeController.searchByIngredients);
router.post("/get/randomRecipes", recipeController.getRandomRecipes);
router.post("/recipe/byUri", recipeController.getRecipeByUri);
router.post(
  "/recipe/forUser",
  validateToken,
  recipeController.getRecipesforuser
);
router.post("/recipe/byid", recipeController.getRecipeById);

module.exports = router;

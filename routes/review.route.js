const router = require("express").Router();
const reviewController = require("../controllers/review.controller.js");
const validateToken = require("../middleware/validateToken");
router.get("/", reviewController.getReviews);
router.post("/", validateToken, reviewController.createReview);
router.delete("/:id", validateToken, reviewController.deleteReview);
router.post("/reviewsbyrecipe", reviewController.getReviewsByRecipeId);
module.exports = router;

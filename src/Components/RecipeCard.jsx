import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const RecipeCard = ({ id, title, rating, imageUrl }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log(id);
    const recipeId = id.startsWith("http://www.edamam.com/")
      ? id.replace("http://www.edamam.com/ontologies/edamam.owl#", "")
      : id;
    navigate(`/viewRecipe/${recipeId}`);
  };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      <CardMedia component="img" height="194" image={imageUrl} alt="img" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`rating-star ${
                i < rating ? "text-warning" : "text-secondary"
              }`}
            >
              ★
            </span>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;

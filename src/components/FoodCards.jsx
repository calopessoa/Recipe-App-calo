import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import APIContext from '../context/APIContext';
import { Card } from 'react-bootstrap';
import './styles/cards.css';

function FoodCards() {
  const { meals, clickedCategory } = useContext(APIContext);
  const navigate = useNavigate();

  const RECIPES_LENGTH = 12;
  const validMeals = meals?.length > RECIPES_LENGTH;
  let twelveMeals = '';

  if (!validMeals) {
    twelveMeals = meals;
    // If a search returns only one item it'll redirect the user to that item path's description;
    if (meals?.length === 1 && clickedCategory !== 'Goat') {
      navigate(`/foods/${meals[0].idMeal}`);
    }
  } else {
    twelveMeals = meals.slice(0, RECIPES_LENGTH);
  }

  return (
    <div className="col">
      {twelveMeals && twelveMeals.map((meal, i) => (
        <Link
          to={ `/foods/${meal.idMeal}` }
          key={ meal.idMeal }
        >
          <Card className="mt-4">
            <img
              className="card-img-top"
              width="50px"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <div className="card-body">
              <p
                className="card-title"
              >
                { meal.strMeal }
              </p>
            </div>
          </Card>
        </Link>

      ))}
    </div>
  );
}

export default FoodCards;
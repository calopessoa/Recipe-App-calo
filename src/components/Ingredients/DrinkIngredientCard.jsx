import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { ingredientsDrinksApi } from '../../services/drinksApi';
import APIContext from '../../context/APIContext';

function DrinkIngredientCard() {
  const [ingredients, setIngredients] = useState([]);
  const arrayLength = 12;

  const { getApiDrinksByIngredients } = useContext(APIContext);

  const handleIngredients = async () => {
    const apiIngred = await ingredientsDrinksApi();
    setIngredients(apiIngred);
  };

  useEffect(() => {
    handleIngredients();
  }, []);

  return (
    <>
      {
        ingredients
          .slice(0, arrayLength)
          .map((each, i) => (
            <Link
              key={ i }
              to="/drinks"
              data-testid={ `${i}-ingredient-card` }
              onClick={ () => getApiDrinksByIngredients(each.strIngredient1) }
            >
              <Card
                className="mt-3"
                style={ { width: '8rem' } }
                data-testid={ `${i}-card-name` }
              >
                {each.strIngredient1}

                <img
                  data-testid={ `${i}-card-img` }
                  alt={ each.strIngredient }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${each.strIngredient1}-Small.png
                ` }
                />
              </Card>
            </Link>
          ))
      }
    </>
  );
}

export default DrinkIngredientCard;
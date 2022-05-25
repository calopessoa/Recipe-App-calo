import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import APIContext from '../context/APIContext';

function DrinkCards() {
  const { drinks } = useContext(APIContext);
  const navigation = useNavigate();

  const RECIPES_LENGTH = 12;
  const twelveDrinks = drinks?.slice(0, RECIPES_LENGTH);

  if (drinks?.length === 1) {
    navigation(`/drinks/${drinks[0].idDrink}`);
  }

  return (
    <div>
      {twelveDrinks && twelveDrinks.map((drink, i) => (
        <Link
          to={ `/drinks/${drink.idDrink}` }
          key={ drink.idDrink }
          data-testid={ `${i}-recipe-card` }
        >
          <img
            width="50px"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${i}-card-img` }
          />
          <p
            data-testid={ `${i}-card-name` }
          >
            { drink.strDrink }
          </p>
        </Link>

      ))}
    </div>
  );
}

export default DrinkCards;
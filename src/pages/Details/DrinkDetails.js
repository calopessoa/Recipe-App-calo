import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import APIContext from '../../context/APIContext';
import { getDrinksApiId } from '../../services/drinksApi';
import { getApiCallback } from '../../helpers/verifyType';
import shareIcon from '../../images/shareIcon.svg';
import '../../pages/Details/styles/details.css';

function DrinkDetails() {
  const { showMsg, setShowMsg, inProgress, setInProgress, isDone, setIsDone,
    myDrink, setMyDrink, ingredients, setIngredients, measure,
    setMeasure, drinkToggleFill, verifyFavorite, isFavorite } = useContext(Context);
  const { meals } = useContext(APIContext);
  const { id } = useParams();
  const navigation = useNavigate();

  const arrayLength = 6;

  useEffect(() => {
    verifyFavorite();
  }, []);

  const verifyProgress = () => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails
      : [];
    console.log(inProgressRecipes);
    const isInProgress = Object.keys(inProgressRecipes)?.filter(
      (recipe) => recipe === id,
    );
    if (isInProgress.length) {
      setInProgress(true);
    }
  };

  const verifyDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterDone = doneRecipes
      ? doneRecipes.filter((recipe) => recipe.id === id)
      : [];
    if (filterDone.length || inProgress) {
      setIsDone(true);
    }
  };

  useEffect(() => {
    verifyProgress();
    verifyDone();
  });

  useEffect(() => {
    getApiCallback(id, getDrinksApiId, setMyDrink);
  }, [id]);

  useEffect(() => {
    const keys = Object.entries(myDrink[0]);
    const filterIngredients = keys
      .filter((i) => i[0].includes('strIngredient') && i[1])
      .map((i) => i[1]);
    const filterMeasure = keys
      .filter((i) => i[0].includes('strMeasure') && i[1])
      .map((i) => i[1]);
    setIngredients(filterIngredients);
    setMeasure(filterMeasure);
  }, [myDrink]);

  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = myDrink[0];

  const sendRecipeToStorage = (recipeId, element) => {
    const getStoredRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const drinks  = { [recipeId]: element };
    const currentRecipe = {
      ...getStoredRecipe,
      cocktails: { ...getStoredRecipe.cocktails, ...drinks },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(currentRecipe));
    navigation(`/drinks/${myDrink[0].idDrink}/in-progress`);
  };

  return (
    <div className="details-container">
      <img
        className="details-image"
        height="200"
        width="300"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <div className="title-details">
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => {
            setShowMsg(true);
            navigator.clipboard.writeText(window.location.href);
          } }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        {showMsg && <p>Link copied!</p>}
        <button
          data-testid="favorite-btn"
          src={ isFavorite }
          type="button"
          onClick={ drinkToggleFill }
        >
          <img src={ isFavorite } alt="favorite" />
        </button>
      </div>
      <div
        className="title-details-2"
      >
        <h3 data-testid="recipe-category">{strAlcoholic}</h3>
      </div>
      {ingredients.map((ingred, i) => (
        <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
          {`${ingred} - ${measure[i]}`}
        </p>
      ))}
      <div
        className="instructions-content"
      >
        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </div>

      <div>
        <h1>Recomendation</h1>
        <section className="recomendation-content">

          {meals.slice(0, arrayLength).map((each, i) => {
            if (i > 1) {
              return (
                <div key={ i } data-testid={ `${i}-recomendation-card` } hidden>
                  <img
                    src={ each.strMealThumb }
                    width="100px"
                    alt="recommendation"
                  />
                  <div data-testid={ `${i}-recomendation-title` }>
                    {each.strMeal}
                  </div>
                </div>
              );
            }
            return (
              <div key={ i } data-testid={ `${i}-recomendation-card` }>
                <img src={ each.strMealThumb } width="100px" alt="recommendation" />
                <div data-testid={ `${i}-recomendation-title` }>{each.strMeal}</div>
              </div>
            );
          })}
        </section>
      </div>
      <section>
        {inProgress && (
          <button
            type="button"
            className="fixed-bottom bottom-button"
            data-testid="start-recipe-btn"
            onClick={ () =>
              navigation(`/drinks/${myDrink[0].idDrink}/in-progress`)}
          >
            Continue Recipe
          </button>
        )}
        {!isDone && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="fixed-bottom bottom-button"
            onClick={ () => sendRecipeToStorage(id, ingredients) }
          >
            Start Recipe
          </button>
        )}
      </section>
    </div>
  );

};

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default DrinkDetails;
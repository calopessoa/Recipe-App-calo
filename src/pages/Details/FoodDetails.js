//ESTILIZAR PARA WEB @media no CSS;
import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import APIContext from '../../context/APIContext';
import { getMealsApiId } from '../../services/mealsApi';
import { getApiCallback } from '../../helpers/verifyType';
import shareIcon from '../../images/shareIcon.svg';
import '../../pages/Details/styles/details.css';

function FoodDetails() {
  const { showMsg, setShowMsg, inProgress, setInProgress, isDone, setIsDone, myMeal, setMyMeal, ingredients, setIngredients, measure, setMeasure, toggleFill, verifyFavorite, isFavorite } = useContext(Context);
  const { drinks } = useContext(APIContext);
  const { id } = useParams();
  const navigation = useNavigate();

  const arrayLength = 6;

  useEffect(() => {
    verifyFavorite();
  }, []);

  const verifyProgress = () => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes')).meals
      : [];
    const isInProgress = Object.keys(inProgressRecipes).filter(
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
    getApiCallback(id, getMealsApiId, setMyMeal);
  }, [id]);

  useEffect(() => {
    const keys = Object.entries(myMeal[0]);
    const filterIngredients = keys
      .filter((i) => i[0].includes('strIngredient') && i[1])
      .map((i) => i[1]);
    const filterMeasure = keys
      .filter((i) => i[0].includes('strMeasure') && i[1])
      .map((i) => i[1]);
    setIngredients(filterIngredients);
    setMeasure(filterMeasure);
  }, [myMeal]);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = myMeal[0];

  const sendRecipeToStorage = (recipeId, element) => {
    const getStoredRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const meals = { [recipeId]: element };
    const currentRecipe = {
      ...getStoredRecipe,
      meals: { ...getStoredRecipe.meals, ...meals },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(currentRecipe));
    navigation(`/foods/${myMeal[0].idMeal}/in-progress`);
  };

  return (
    <div className="details-container">
      <div className="left-column">
        <img
          className="details-image"
          height="200"
          width="300"
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
        />
        <div className="title-details">
          <h2 data-testid="recipe-title">{strMeal}</h2>
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
            type="button"
            onClick={ toggleFill }
            src={ isFavorite }
          >
            <img src={ isFavorite } alt="favorite" />
          </button>

          <h3 data-testid="recipe-category">{strCategory}</h3>
      </div>
      {/* <div className="title-details-2">
        
      </div> */}
      {ingredients.map((ingred, i) => (
        <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
          {`${ingred} - ${measure[i]}`}
        </p>
      ))}
        </div>
      <section className="right-column">
        <div className="instructions-content">
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <div className="video-content">
          <iframe
            data-testid="video"
            src={ strYoutube?.replace('watch?', 'embed/') }
            title="Embedded youtube"
          />
        </div>
        <div>
          <h1>Recomendation</h1>
        </div>
        <section className="recomendation-content">
          {drinks.slice(0, arrayLength).map((each, i) => {
            if (i > 1) {
              return (
                <div key={ i } data-testid={ `${i}-recomendation-card` } hidden>
                  <img
                    src={ each.strDrinkThumb }
                    width="100px"
                    alt="recommendation"
                  />
                  <div data-testid={ `${i}-recomendation-title` }>
                    {each.strDrink}
                  </div>
                </div>
              );
            }
            return (
              <div key={ i } data-testid={ `${i}-recomendation-card` }>
                <img
                  src={ each.strDrinkThumb }
                  width="100px"
                  alt="recommendation"
                />
                <p data-testid={ `${i}-recomendation-title` }>
                  {each.strDrink}
                </p>
              </div>
            );
          })}
        </section>
      </section>

      <section>
        {inProgress && (
          <button
            type="button"
            className="fixed-bottom bottom-button"
            data-testid="start-recipe-btn"
            onClick={() =>
              navigation(`/foods/${myMeal[0].idMeal}/in-progress`)}
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

FoodDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FoodDetails;

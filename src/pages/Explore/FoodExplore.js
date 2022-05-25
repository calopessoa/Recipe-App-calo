import React from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getRandomFood } from '../../services/mealsApi';

function FoodExplore() {
  const navigation = useNavigate();

  const surpriseMe = () => {
    getRandomFood().then(({ meals }) => {
      navigation(`/foods/${meals[0].idMeal}`);
    });
  };

  return (
    <>
      <Header />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => navigation('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        type="button"
        onClick={ () => navigation('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => surpriseMe() }
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}

export default FoodExplore;
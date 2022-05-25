import React from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getRandomDrink } from '../../services/drinksApi';

function DrinksExplore() {
  const navigation = useNavigate();

  const surpriseMe = () => {
    getRandomDrink().then(({ drinks }) => {
      navigation(`/drinks/${drinks[0].idDrink}`);
    });
  };

  return (
    <>
      <Header />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => navigation('/explore/drinks/ingredients') }
      >
        By Ingredient
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

export default DrinksExplore;
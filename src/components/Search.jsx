import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import verifyType from '../helpers/verifyType';
import APIContext from '../context/APIContext';

const VALUE_INGREDIENTS = 'value-ingredients';
const VALUE_NAME = 'value-name';
const VALUE_FIRST_LETTER = 'value-first-letter';

function Search({ toggleSearch, setToggleSearch }) {
  const [radioValue, setRadioValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const location = useLocation();

  const {
    meals,
    drinks,
    getApiMealsByIngredients,
    getApiMealsByFirstLetter,
    getApiMealsByName,
    getApiDrinksByIngredients,
    getApiDrinksByFirstLetter,
    getApiDrinksByName,
  } = useContext(APIContext);

  // const routes = {
  //   '/foods': 'Foods',
  //   '/drinks': 'Drinks',
  //   '/explore/foods/nationalities': 'Explore Nationalities',
  // };

  const handleClick = (radio, inputValue) => {
    verifyType(meals, drinks, searchInputValue);
    if (location.pathname === '/foods') {
      switch (radio) {
      case VALUE_INGREDIENTS:
        return getApiMealsByIngredients(inputValue);
      case VALUE_NAME:
        return getApiMealsByName(inputValue);
      case VALUE_FIRST_LETTER:
        return getApiMealsByFirstLetter(inputValue);
      default: break;
      }
    } else {
      switch (radio) {
      case VALUE_INGREDIENTS:
        return getApiDrinksByIngredients(inputValue);
      case VALUE_NAME:
        return getApiDrinksByName(inputValue);
      case VALUE_FIRST_LETTER:
        return getApiDrinksByFirstLetter(inputValue);
      default: break;
      }
    }
  };

  const handleInputChange = (value) => {
    if (value.length > 1 && radioValue === VALUE_FIRST_LETTER) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    setSearchInputValue(value);
  };

  const handleRadioChange = (value) => {
    setRadioValue(value);
  };

  return (
    toggleSearch && (
    <form
      onSubmit={ () => {
      // onSubmit(e);
      setToggleSearch(false);
    } }>
      <section className="search-input">
        <input
          data-testid="search-input"
          onChange={({ target: { value } }) => handleInputChange(value)}
        />
      </section>
      <section className="radio-btns">
        <label htmlFor="ingredients">
          Ingredients
          <input
            id="ingredients"
            type="radio"
            name="radio-name"
            value="value-ingredients"
            data-testid="ingredient-search-radio"
            onChange={({ target: { value } }) => handleRadioChange(value)}
          />
        </label>
        <label htmlFor="search-name">
          Name
          <input
            id="search-name"
            type="radio"
            name="radio-name"
            value="value-name"
            data-testid="name-search-radio"
            onChange={({ target: { value } }) => handleRadioChange(value)}
          />

        </label>

        <label htmlFor="first-letter">
          Primeira Letra
          <input
            id="first-letter"
            type="radio"
            name="radio-name"
            value="value-first-letter"
            data-testid="first-letter-search-radio"
            onChange={({ target: { value } }) => handleRadioChange(value)}
          />
        </label>
      </section>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={() => handleClick(radioValue, searchInputValue)}
      >
        Busca
      </button>
    </form>
    )
  );
};

Search.propTypes = {
  toggleSearch: propTypes.bool,
  setToggleSearch: propTypes.func,
}.isRequired;

export default Search;
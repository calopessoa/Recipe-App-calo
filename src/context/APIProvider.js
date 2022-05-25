import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import APIContext from './APIContext';
import {
  getCategories,
  getMeals,
  getMealsByCategory,
  getMealsIngredients,
  getMealsName,
  getMealsFirstLetter,
  getMealsNationalities,
  fetchMealsByNationalities,
} from '../services/mealsApi';

import {
  getCategoriesDrinks,
  getDrinks,
  getDrinksByCategory,
  getDrinksIngredients,
  getDrinksName,
  getDrinksFirstLetter,
} from '../services/drinksApi';

const APIProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [clickedCategory, setClickedCategory] = useState('');
  const [nationalities, setNationalities] = useState([]);
  const [selected, setSelected] = useState('All');
  const [nationMeals, setNationMeals] = useState([]);


  const getApiMealsByIngredients = async (query) => {
    const api = await getMealsIngredients(query);
    setMeals(api);
  };

  const getApiMealsByName = async (query) => {
    const api = await getMealsName(query);
    setMeals(api);
  };

  const getApiMealsByFirstLetter = async (query) => {
    const api = await getMealsFirstLetter(query);
    setMeals(api);
  };

  const getApiDrinksByIngredients = async (query) => {
    const api = await getDrinksIngredients(query);
    setDrinks(api);
  };

  const getApiDrinksByName = async (query) => {
    const api = await getDrinksName(query);
    setDrinks(api);
  };

  const getApiDrinksByFirstLetter = async (query) => {
    const api = await getDrinksFirstLetter(query);
    setDrinks(api);
  };

  const getApiCategories = async () => {
    const api = await getCategories();
    setCategories(api);
  };

  const getApiDrinkCategories = async () => {
    const api = await getCategoriesDrinks();
    setDrinkCategories(api);
  };

  const getApiMeals = async () => {
    const api = await getMeals();
    setMeals(api);
    setFiltered(false);
  };

  const getApiMealsByCategory = async (category) => {
    const api = await getMealsByCategory(category);
    setFiltered(true);
    setMeals(api);
  };

  const getApiDrinks = async () => {
    const api = await getDrinks();
    setDrinks(api);
    setFiltered(false);
  };

  const getApiDrinksByCategory = async (category) => {
    const api = await getDrinksByCategory(category);
    setDrinks(api);
    setFiltered(true);
  };

  useEffect(() => {
    getApiCategories();
    getApiDrinkCategories();
    getApiMeals();
    getApiDrinks();
  }, []);

  const handleNationalities = async () => {
    const apiNations = await getMealsNationalities();
    setNationalities(apiNations);
  };

  useEffect(() => {
    handleNationalities();
    const handleFilteredNationalities = async () => {
      const mealByNation = await fetchMealsByNationalities(selected);
      setNationMeals(mealByNation);
    };
    handleFilteredNationalities();
  }, [selected]);

  const values = {
    categories,
    drinkCategories,
    meals,
    drinks,
    getApiMealsByCategory,
    getApiDrinksByCategory,
    filtered,
    setFiltered,
    getApiMeals,
    getApiDrinks,
    radioValue,
    setRadioValue,
    searchInputValue,
    setSearchInputValue,
    getApiMealsByIngredients,
    getApiMealsByName,
    getApiMealsByFirstLetter,
    getApiDrinksByIngredients,
    getApiDrinksByName,
    getApiDrinksByFirstLetter,
    clickedCategory,
    setClickedCategory,
    nationalities,
    selected,
    nationMeals,
    setSelected,
  };

  return (
    <APIContext.Provider value={ values }>
      { children }
    </APIContext.Provider>
  );
};

APIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default APIProvider;
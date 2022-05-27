import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Context from './Context';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [myMeal, setMyMeal] = useState([{}]);
  const [myDrink, setMyDrink] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  const [recipe, setRecipe] = useState([{}]);

  const { id } = useParams();

  const validation = () => {
    const MIN_LENGTH = 6;
    const requiredPassword = password.length > MIN_LENGTH;
    const requiredEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = requiredEmail.test(email);

    const isValid = requiredPassword && validateEmail;
    if (isValid) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };

  useEffect(() => {
    validation();
  }, [email, password]);

  const toggleFill = () => {
    const {
      strMealThumb,
      strMeal,
      strCategory,
      strArea,
    } = myMeal[0];
    const recipe = {
      id,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (isFilled) {
      setIsFilled(false);
      setIsFavorite(whiteHeartIcon);
    } else {
      const localStorageArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || '';
      const currentArray = [...localStorageArray];
      currentArray.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(currentArray));
      setIsFilled(true);
      setIsFavorite(blackHeartIcon);
    }
  };

  const drinkToggleFill = () => {
    const { strDrinkThumb, strDrink, strCategory, strAlcoholic, strArea } = myDrink[0];

    const recipe = {
      id,
      type: 'drink',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    if (isFilled) {
      setIsFilled(false);
      setIsFavorite(whiteHeartIcon);
    } else {
      const localStorageArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || '';
      const currentArray = [...localStorageArray];
      currentArray.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(currentArray));
      setIsFilled(true);
      setIsFavorite(blackHeartIcon);
    }
  };

  const verifyFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const getFavorite = favoriteRecipes
      ? favoriteRecipes.filter((rec) => rec.id === id)
      : [];
    if (getFavorite.length) {
      setIsFavorite(blackHeartIcon);
      setIsFilled(true);
    }
  };

  const userData = {
    email,
    setEmail,
    password,
    setPassword,
    btn,
    setBtn,
    validation,
    showMsg,
    setShowMsg,
    inProgress,
    setInProgress,
    isDone,
    setIsDone,
    myMeal,
    setMyMeal,
    myDrink,
    setMyDrink,
    ingredients,
    setIngredients,
    measure,
    setMeasure,
    recipe,
    setRecipe,
    isFilled,
    setIsFilled,
    isFavorite,
    setIsFavorite,
    toggleFill,
    drinkToggleFill,
    verifyFavorite,
  };

  return (
    <Context.Provider value={ userData }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
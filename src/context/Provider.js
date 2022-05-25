import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

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
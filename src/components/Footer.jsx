import React from 'react';
import { useNavigate } from 'react-router';
import './styles/header.css';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => {
  const navigate= useNavigate();

  return (
    <footer id="footer" data-testid="footer" className="position-fixed fixed-bottom">

      <img
        data-testid="drinks-bottom-btn"
        role="presentation"
        src={ drinkIcon }
        alt="drink-icon"
        onClick={ () => navigate('/drinks') }
      />

      <img
        data-testid="explore-bottom-btn"
        role="presentation"
        src={ exploreIcon }
        alt="explore-icon"
        onClick={ () => navigate('/explore') }
      />

      <img
        data-testid="food-bottom-btn"
        role="presentation"
        src={ mealIcon }
        alt="meal-icon"
        onClick={ () => navigate('/foods') }
      />

    </footer>
  );
};

export default Footer;
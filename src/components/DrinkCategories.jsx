import React, { useContext, useState } from 'react';
import APIContext from '../context/APIContext';

function DrinkCategories() {
  const { drinkCategories,
    getApiDrinksByCategory, getApiDrinks } = useContext(APIContext);
  const MEALS_LENGTH = 5;
  const fiveCategories = drinkCategories?.slice(0, MEALS_LENGTH);
  const categoriesList = fiveCategories?.map((category) => category.strCategory);

  const [clickedCategory, setClickedCategory] = useState('');

  const handleCategoryClick = (target, category) => {
    setClickedCategory(target.value);
    if (clickedCategory === category) {
      getApiDrinks();
    } else {
      getApiDrinksByCategory(category);
    }
  };

  return (
    <div className="categoryList-container">

      <div
        className="container-buttons"
        aria-label="Basic outlined example"
      >
        <button
          type="button"
          className="btn btn-outline-primary"
          data-testid="All-category-filter"
          onClick={ () => getApiDrinks() }
        >
          All
        </button>
        {categoriesList && categoriesList.map((category) => (
          <button
            type="button"
            className="btn btn-outline-primary"
            key={ category }
            value={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ ({ target }) => handleCategoryClick(target, category) }
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrinkCategories;
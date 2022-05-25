import React, { useContext } from 'react';
import APIContext from '../context/APIContext';

function FoodCategories() {
  const { categories, getApiMealsByCategory, getApiMeals, clickedCategory, setClickedCategory } = useContext(APIContext);

  const { meals } = categories;
  const MEALS_LENGTH = 5;
  const upToFive = meals?.slice(0, MEALS_LENGTH);
  const categoriesList = upToFive?.map((categ) => categ.strCategory);

  const handleCategoryClick = (target, category) => {
    setClickedCategory(target.value);
    if (clickedCategory === category) {
      getApiMeals();
    } else {
      getApiMealsByCategory(category);
    }
  };

  return (
    <div className="categoryList-container">

      <div
        className="container-buttons"
        aria-label="Basic outlined example"
      >
        <button
          className="btn btn-outline-primary"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => getApiMeals() }
        >
          All
        </button>
        {categoriesList
          && categoriesList.map((category) => (
            <button
              className="btn btn-outline-primary"
              type="button"
              key={ category }
              value={ category }
              data-testid={ `${category}-category-filter` }
              onClick={
                ({ target }) => handleCategoryClick(target, category)
              }
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
}

export default FoodCategories;
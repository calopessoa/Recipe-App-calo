export const getDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};

export const getCategoriesDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};

export const getDrinksByCategory = async (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};

export const getDrinksFirstLetter = async (query) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`;
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};

export const getDrinksIngredients = async (query) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};

export const getDrinksName = async (query) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};

// random Drinks;
export const getRandomDrink = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const request = await fetch(url);
  const result = await request.json();
  return result;
};

// fetch por ID da api de bebidas:
export const getDrinksApiId = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};

// Requisita ingredientes de bebidas;
export const ingredientsDrinksApi = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const request = await fetch(url);
  const { drinks } = await request.json();
  return drinks;
};
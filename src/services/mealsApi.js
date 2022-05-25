export const getMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const getCategories = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export const getMealsByCategory = async (category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const getMealsFirstLetter = async (query) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const getMealsIngredients = async (query) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

export const getMealsName = async (query) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

// fetch por ID da api de refeições:
export const getMealsApiId = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

// random Foods;
export const getRandomFood = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const request = await fetch(url);
  const result = await request.json();
  return result;
};

// a listagem de todas as nacionalidades para o dropdown;
export const getMealsNationalities = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

// Requisita a imagem e titulo das comidas por nacionalidades;
export const fetchMealsByNationalities = async (query) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`;
    const request = await fetch(url);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

// Requisita ingredientes de refeições;
export const ingredientsApi = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const request = await fetch(url);
  const { meals } = await request.json();
  return meals;
};

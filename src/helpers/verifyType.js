export const verifyType = (meals, drinks, searchInputValue) => {
  const filterMeals = meals.find((meal) => meal === searchInputValue);
  const filterDrinks = drinks.find((drink) => drink === searchInputValue);
  if (filterDrinks === undefined || filterMeals === undefined) {
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export const getApiCallback = async (id, apiCallback, setState) => {
  const api = await apiCallback(id);
  setState(api);
};

// export default verifyType;
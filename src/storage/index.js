export const setTokens = () => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const setEmailStorage = (userEmail) => {
  const user = { email: userEmail };
  localStorage.setItem('user', JSON.stringify(user));
};

export const getEmailStoraged = () => {
  const data = JSON.parse(localStorage.getItem('user')) || '';
  return data;
};
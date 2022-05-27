import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import FoodDetails from './pages/Details/FoodDetails';
import Drinks from './pages/Drinks';
import DrinkDetails from './pages/Details/DrinkDetails';
import Profile from './pages/Profile';
import Explore from './pages/Explore/Explore';
import FoodExplore from './pages/Explore/FoodExplore';
import DrinksExplore from './pages/Explore/DrinksExplore';
import Nationalities from './pages/Nationalities';
import FoodsIngredients from './pages/Ingredients/FoodsIngredients';
import DrinksIngredients from './pages/Ingredients/DrinksIngredients';
import FoodProgress from './pages/InProgress/FoodProgress';
import DrinkProgress from './pages/InProgress/DrinkProgress';
import NotFound from './pages/NotFound';

const RoutePages = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/foods" element={<Foods />} />
      <Route exact path="/foods/:id" element={ <FoodDetails /> } />
      <Route exact path="/foods/:id/in-progress" element={ <FoodProgress /> } />
      <Route exact path="/drinks" element={<Drinks />} />
      <Route exact path="/drinks/:id" element={ <DrinkDetails /> } />
      <Route
        exact path="/drinks/:id/in-progress" element={<DrinkProgress />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/explore" element={<Explore />} />
      <Route exact path="/explore/foods" element={<FoodExplore />} />
      <Route exact path="/explore/drinks" element={<DrinksExplore />} />
      <Route
        exact path="/explore/foods/nationalities" element={<Nationalities />} />
      <Route
        exact path="/explore/foods/ingredients" element={<FoodsIngredients />} />
       <Route
        exact path="/explore/drinks/ingredients" element={<DrinksIngredients />} />
       <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutePages;

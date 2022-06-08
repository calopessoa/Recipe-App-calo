import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkCategories from '../components/DrinkCategories';
import DrinkCards from '../components/DrinkCards';

function Drinks() {
  return (
    <>
      <Header />
      <DrinkCategories />
      <DrinkCards />
      <Footer />
    </>
  )
}

export default Drinks;
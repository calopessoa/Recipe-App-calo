import FoodCards from "../components/FoodCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FoodCategories from "../components/FoodCategories";

function Foods() {
  return (
    <>
      <Header />
      <FoodCategories />
      <FoodCards />
      <Footer />
    </>
  );
};

export default Foods;
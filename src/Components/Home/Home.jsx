import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryTabs from "../../Components/CategoryTabs/CategoryTabs";
import "./Home.scss";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => setCategories(res.data.meals))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        let url = "";
        if (selectedCategory === "All") {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
        } else {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        }

        const { data } = await axios.get(url);

        setMeals(data.meals || []);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setMeals([]);
      }
      setLoading(false);
    };

    fetchMeals();
  }, [selectedCategory]);

  return (
    <div className="home-container">
      <h1 className="main-title">Learn, Cook, Eat Your Food</h1>

      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="meals-grid">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="meal-card">
            <div className="img-container">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </div>

            <h3>{meal.strMeal.split(" ").slice(0, 2).join(" ")}</h3>

            {selectedCategory === "All" && meal.strArea && (
              <p className="area-text">
                <i className="fa-solid fa-earth-americas"></i> {meal.strArea}
              </p>
            )}

            <Link to={`/mealdetails/${meal.idMeal}`} className="view-btn">
              View Recipe
            </Link>
          </div>
        ))}
      </div>
      {loading && <div className="loading-text">Loading...</div>}
    </div>
  );
};

export default Home;

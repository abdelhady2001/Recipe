import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MealDetails.scss";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        setMeal(res.data.meals[0]);
      })
      .catch((err) => {
        console.error("Error fetching meal details:", err);
      });
  }, [id]);

  if (!meal) {
    return (
      <div className="loading-container">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientName = meal[`strIngredient${i}`];
    const ingredientMeasure = meal[`strMeasure${i}`];

    if (ingredientName && ingredientName.trim() !== "") {
      ingredients.push({
        name: ingredientName,
        measure: ingredientMeasure,
      });
    }
  }

  return (
    <div className="meal-details-page">
      <div className="details-grid">
        <div className="column image-side">
          <h1 className="meal-name">{meal.strMeal}</h1>
          <div className="img-holder">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
          <div className="action-buttons">
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="btn btn-youtube"
              >
                <i className="fa-brands fa-youtube"></i> youtube
              </a>
            )}
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noreferrer"
                className="btn btn-source"
              >
                <i className="fa-solid fa-earth-americas"></i> source
              </a>
            )}
          </div>
        </div>

        <div className="column instructions-side">
          <p className="instructions-text">{meal.strInstructions}</p>
        </div>

        <div className="column ingredients-side">
          <div className="ingredients-card">
            <h3 className="card-title">Ingredients</h3>
            <div className="ingredients-list">
              {ingredients.map((ing, index) => (
                <div key={index} className="ing-item">
                  <span className="ing-name">{ing.name}:</span>
                  <span className="ing-measure">{ing.measure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;

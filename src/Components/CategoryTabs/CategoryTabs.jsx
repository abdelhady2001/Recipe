import React from "react";
import "./CategoryTabs.scss";

const Tabs = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ul className="category-tabs">
      <li
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => onSelectCategory("All")}
      >
        All
      </li>

      {categories.map((cat) => (
        <li
          key={cat.strCategory}
          className={selectedCategory === cat.strCategory ? "active" : ""}
          onClick={() => onSelectCategory(cat.strCategory)}
        >
          {cat.strCategory}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;

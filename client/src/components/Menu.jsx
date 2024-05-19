import React, { useEffect, useState } from "react";
import { menuData } from "../constantFiles/menuContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import f1 from "../assets/images/f1.png";
import MenuCards from "./MenuCards";

const Menu = () => {
  const [foodItems, setFoodItems] = useState(menuData);
  const [category, setCategory] = useState([]);
  const [foodFilter, setFoodFilter] = useState("all");
  const [filterFoodItems, setFilterFoodItems] = useState(menuData);

  const getFoodItems = (cat) => {
    if (cat === "all") {
      setFilterFoodItems(menuData);
    } else {
      const foods = menuData.filter((el) => el.category === cat);
      setFilterFoodItems(foods);
    }

    setFoodFilter(cat);
  };

  const foodHandler = (cat) => {
    getFoodItems(cat);
  };

  //category Filter Function
  const getUniqueCategory = (item) => {
    const allCategory = item.map((el) => el.category);
    const alluniqueCategory = [...new Set(allCategory)];
    setCategory(alluniqueCategory);
  };

  useEffect(() => {
    getUniqueCategory(foodItems);
  }, [foodItems]);

  return (
    <section className="menuSection">
      <div className="menuWrapper">
        <div className="secHeading">
          <h2>Our Menu</h2>
        </div>
        <div className="contentContainer">
          <div className="menuCardContainer">
            <div className="tabsList">
              <ul>
                <li onClick={() => foodHandler("all")}  className={foodFilter === 'all' ? "activeTab" : ""}>All</li>
                {category.map((cat) => (
                  <li
                    onClick={() => foodHandler(cat)}
                    key={cat}
                    className={foodFilter === cat ? "activeTab" : ""}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tabContent">
              <div className="allCards">
                {filterFoodItems.map((items) => {
                  return <MenuCards key={items.id} {...items} />;
                })}
              </div>
            </div>
          </div>
          <div className="viewMore">
            <button>View More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;

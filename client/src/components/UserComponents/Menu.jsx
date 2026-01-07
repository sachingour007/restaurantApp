import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import MenuCards from "./MenuCards";
import { Link } from "react-router-dom";
import useMenuData from "../../hooks/useMenuData";
import { useSelector } from "react-redux";
import MenuShimmer from "../../shimmer Ui/MenuShimmer";

const Menu = ({ showTab }) => {
  const getMenu = useMenuData();
  const foodItems = useSelector((store) => store.menu);

  const menuCategories = [
    ...new Set((foodItems || []).map((item) => item.category)),
  ];
  const [category, setCategory] = useState("all");

  const filteredItems =
    category === "all"
      ? foodItems
      : foodItems.filter((food) => food.category === category);

  const foodHandler = (val) => {
    if (val === "all") {
      setCategory("all");
    } else {
      setCategory(val);
    }
  };
  useEffect(() => {
    getMenu();
  }, []);

  return (
    <section className="menuSection">
      <div className="menuWrapper">
        <div className="secHeading">
          <h2>Our Menu</h2>
        </div>
        <div className="contentContainer">
          <div className="menuCardContainer">
            {showTab && (
              <div className="tabsList">
                <ul>
                  <li
                    onClick={() => foodHandler("all")}
                    className={category === "all" ? "activeTab" : ""}
                  >
                    All
                  </li>
                  {menuCategories.map((cat) => (
                    <li
                      onClick={() => foodHandler(cat)}
                      key={cat}
                      className={category === cat ? "activeTab" : ""}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="tabContent">
              {filteredItems.length > 0 ? (
                <div className="allCards">
                  {filteredItems.map((items) => {
                    return <MenuCards key={items._id} items={items} />;
                  })}
                </div>
              ) : (
                <MenuShimmer val={9} />
              )}
            </div>
          </div>
          {!showTab ? (
            <div className="viewMore">
              <Link to={"/menu"}>View More</Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;

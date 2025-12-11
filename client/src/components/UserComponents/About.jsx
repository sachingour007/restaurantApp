import React from "react";
import { aboutImg } from "../../assets/index";

const About = () => {
  return (
    <section className="aboutSection">
      <div className="aboutWrapper">
        <div className="container">
          <div className="imgBox">
            <img src={aboutImg} alt="" />
          </div>
          <div className="contentBox">
            <h2>We Are Hot Cornor</h2>
            <p>
              At HotCorner, we believe great food doesn’t have to be
              complicated. Our kitchen serves freshly crafted fast-food
              favourites made to satisfy every craving. From juicy,
              flavour-packed burgers to oven-fresh pizzas, creamy pastas, and
              crispy fries — every dish is prepared with quality ingredients and
              a true passion for good taste. HotCorner started with one simple
              idea: to create a place where people can enjoy quick, delicious
              food without compromising on freshness. Whether you're grabbing a
              bite with friends, ordering a late-night snack, or craving
              something comforting on a busy day, HotCorner brings you flavours
              that feel familiar yet exciting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

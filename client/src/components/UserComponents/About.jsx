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
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

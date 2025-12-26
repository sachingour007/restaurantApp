import React from "react";
import { reviewBg } from "../../assets";
import TestimonialCard from "./TestimonialCard";
import { reviewData } from "../../constantFiles/reviewsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";

const Testimonials = () => {
  return (
    <section
      className="testimonialSec"
      style={{ backgroundImage: `url(${reviewBg})` }}
    >
      <div className="wrapper">
        <Swiper
          className="cards"
          slidesPerView={1}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={true}
        >
          {reviewData.map((item) => (
            <SwiperSlide key={item.id}>
              <TestimonialCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

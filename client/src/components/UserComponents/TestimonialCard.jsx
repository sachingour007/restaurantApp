import { Swiper, SwiperSlide } from "swiper/react";

const TestimonialCard = ({ avatar, name, review}) => {
  return (
    <>
      <div className="testimonial-card">
        <div className="profile">
          <img src={avatar} alt="user" className="profile-img" />
        </div>

        <h3 className="name">{name}</h3>

        <div className="rating">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span className="inactive">★</span>
        </div>

        <p className="review">{review}</p>
      </div>
    </>
  );
};

export default TestimonialCard;

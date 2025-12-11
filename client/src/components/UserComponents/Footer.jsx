import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="flexSec">
        <div className="contactUs">
          <h2>Contact Us</h2>
          <div className="contactLinks">
            <a>
              <FontAwesomeIcon icon={faLocationDot} />
              Kota, Rajasthan
            </a>
            <a href="tel:+91 0123456789">
              <FontAwesomeIcon icon={faPhone} />
              +91 0123456789
            </a>
            <a href="mailto: hotcornor@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} />
              hotcornor@gmail.com
            </a>
          </div>
        </div>
        <div className="socialLinks">
          <h2>Hot Corner</h2>
          <div className="socialIcons">
            <a href="https://www.facebook.com/" target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://x.com/" target="_blank">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        <div className="openinnHours">
          <h2>Opening Hours</h2>
          <div className="openingDetails">
            <p>Everyday</p>
            <p>10.00 Am -10.00 Pm</p>
          </div>
        </div>
      </div>
      <div className="copyrightContainer">
        <p>© 2024 All Rights Reserved By Hot Corner</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
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
            <Link>
              <FontAwesomeIcon icon={faLocationDot} />
              Location
            </Link>
            <Link>
              <FontAwesomeIcon icon={faPhone} />
              +91 0123456789
            </Link>
            <Link>
              <FontAwesomeIcon icon={faEnvelope} />
              demo@gmail.com
            </Link>
          </div>
        </div>
        <div className="socialLinks">
          <h2>Hot Corner</h2>
          <div className="socialIcons">
            <Link>
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
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

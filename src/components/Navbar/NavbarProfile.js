import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUtensils,
  faCalendarCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./NavbarProfile.css";

const NavbarProfile = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const navLinks = [
    { to: "/", label: "Home", icon: faHome },
    { to: "/search", label: "Reserve a Table", icon: faUtensils },
    // { to: "/watchlist", label: "My Reservations", icon: faCalendarCheck },
    { to: "/account", label: "Profile", icon: faUser },
  ];

  return (
    <nav className={`${isMobile ? "navbar mobile" : "navbar-column"}`} style={isMobile ? { left: "0" } : {}}>
      <ul>
        {navLinks.map(({ to, label, icon }) => (
          <li key={to} className={location.pathname === to ? "active" : ""}>
            <Link to={to}>
              <FontAwesomeIcon icon={icon} />
              {!isMobile && <span>{label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarProfile;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUtensils,
  faCalendarCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY,setLastScrollY] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtBottom =
        currentScrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100;

      if (isMobile) {
        setIsVisible(currentScrollY === 0 || !isAtBottom);
      } else {
        setIsVisible(currentScrollY === 0 || !isAtBottom);
      }

      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
    <nav
      className={`navbar ${isScrolled ? "scrolled" : ""} ${
        isMobile ? "mobile" : "wide"
      } ${isVisible ? "visible" : "hidden"}`}
    >
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

export default Navbar;

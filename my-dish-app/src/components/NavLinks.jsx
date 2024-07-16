import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ link, className, onClick }) => {
  return (
    <li className={className}>
      <Link to={`/${link}`} onClick={onClick}>
        {link}
      </Link>
    </li>
  );
};

export default NavLinks;

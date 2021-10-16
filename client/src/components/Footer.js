import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div id="footer">
        <ul id="menu">
          <li>
            <NavLink to="/cups">Кружки</NavLink>
          </li>
          <li>
            <NavLink to="/t-shirts">Футболки</NavLink>
          </li>
          <li>
            <NavLink to="/about">О нас</NavLink>
          </li>
          <li>
            <NavLink to="/ship&pay">Доставка и оплата</NavLink>
          </li>
        </ul>
        <ul id="socials">
          <li>
            <a href="https://instagram.com">Instagram</a>
          </li>
          <li>
            <a href="https://facebook.com">Facebook</a>
          </li>
          <li>
            <a href="https://telegram.org">Telegram</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

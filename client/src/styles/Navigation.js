import React from "react";
import styles from "../styles/BookingTable.css";

const navigationItems = [
  { label: "HOME", href: "/" },
  { label: "MENU", href: "/menu" },
  { label: "BookTable", href: "/book" },
];

const NavigationMenu = () => {
  return (
    <nav className={styles.navigationWrapper}>
      <ul className={styles.navList}>
        {navigationItems.map((item) => (
          <li key={item.label} className={styles.navItem}>
            <a href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          </li>
        ))}
        <li className={styles.navItem}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/73d199db4f453359e63e4d9ef6237b28aa58e0072342931e30698a4a2f810bba?placeholderIfAbsent=true&apiKey=f5780e0a53ec4d1a95fc417ce1c2121f"
            alt="Navigation icon"
            className={styles.navIcon}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;

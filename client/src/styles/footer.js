import React from "react";
import "../styles/BookingTable.css";

const footerSections = [
  {
    title: "the boys Restaurant the best in Viet Nam",
    className: "restaurantInfo",
  },
  { title: "thong tin nha hang", className: "restaurantDetails" },
  { title: "lien he ho tro", className: "support" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        {footerSections.map((section) => (
          <section key={section.title} className={section.className}>
            {section.title}
          </section>
        ))}
      </div>
    </footer>
  );
};

export default Footer;

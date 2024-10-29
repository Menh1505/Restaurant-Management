import React from "react";
import styles from "../styles/BookingTable.css";

const BookingForm = () => {
  return (
    <form className={styles.bookingForm}>
      <div className={styles.formLines}>
        <hr className={styles.formLine} />
        <hr className={styles.formLine} />
        <hr className={styles.formLine} />
        <hr className={styles.formLine} />
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c23069ca8357a7c2e58dc970c82188893bc54bc85cca6c923051892cca7f61ed?placeholderIfAbsent=true&apiKey=f5780e0a53ec4d1a95fc417ce1c2121f"
        alt=""
        className={styles.decorativeImage}
      />

      <button type="submit" className={styles.confirmButton}>
        Confirm
      </button>
    </form>
  );
};

export default BookingForm;

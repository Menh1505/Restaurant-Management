import React from "react"
import { Link } from "react-router-dom"  // Thêm import này
import "./Navigation.css"

export default function Navigation() {
  return (
    <div className="frame-88 clip-contents">


      <img
        src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/kir21mwt109-417%3A233?alt=media&token=0ba50cdc-2d20-444d-8564-fb46a542522e"
        alt="Not Found"
        className="rectangle-218"
      />
      <p className="the-boy-s">THE BOY'S</p>
      <div className="frame-95 clip-contents">
        {/* <div className="group-161"> */}
        <div className="frame-971 clip-contents">
          <Link to="/" className="active">
            HOME
          </Link>
        </div>

        <div className="frame-971 clip-contents">
          <Link to="/menu" className="menu">
            MENU
          </Link>
        </div>

        <div className="frame-971 clip-contents">
          <Link to="/booking" className="bookingtable">
            BookingTable
          </Link>
        </div>

        <div className="frame-971 clip-contents">
          <Link to="/admin" className="pages">
            PAGES
          </Link>
        </div>


        {/* </div> */}
      </div>
      <div>
        <Link to="/" className="return">
          Revenue
        </Link>
      </div>
      {/* <div className="group-4497"> */}
      <div>
        <Link to="/login" className="user-icon">
          &#128100;
        </Link>
      </div>
    </div>
  )
}
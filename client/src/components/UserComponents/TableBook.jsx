import React from "react";
import MapComponent from "./MapComponent";

const TableBook = () => {
  return (
    <section className="tableSection">
      <div className="tableWrapper">
        <h2>Book A Table</h2>
        <div className="mainContainer">
          <div className="formContainer">
            <form action="" onSubmit="">
              <div className="inputContainer">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter Your Name..."
                  value=""
                  required
                />
              </div>
              <div className="inputContainer">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter Phone Number..."
                  value=""
                  required
                />
              </div>
              <div className="inputContainer">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email..."
                  value=""
                  required
                />
              </div>
              <div className="inputContainer">
                <select name="" id="">
                  <option>How Many Persons?</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div className="inputContainer">
                <input type="date" name="date" id="date" value="" />
              </div>
              <div className="inputContainer">
                <select name="" id="">
                  <option>Select the Slot</option>
                  <option value="6PM-7PM">6PM - 7PM</option>
                  <option value="7PM-8PM">7PM - 8PM</option>
                  <option value="8PM-9PM">8PM - 9PM</option>
                  <option value="9PM-10PM">9PM - 10PM</option>
                </select>
              </div>
              <input type="submit" value="Book Now" />
            </form>
          </div>
          <div className="mapBox">
            <MapComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableBook;

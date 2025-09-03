"use client";
import Link from "next/link";

export default function Dashboard() {
  const fname = "User"; // Placeholder, replace with auth logic if needed

  return (
    <>
      <header>
        <nav>
          <div className="nav-container">
            <div className="nav-logo">
              <Link href="/landing_page_feature/landing_page.html">
                EvenBoo
              </Link>
            </div>
            <div className="right-nav">
              <div className="user-info">
                <span>Welcome</span>
                <Link href="/Profile_Management_feature/profilemanagement.php">
                  <span className="user">{fname}</span>
                </Link>
              </div>
              <div className="nav-icon">
                <Link href="#">
                  <i className="fa-solid fa-bell"></i>
                </Link>
                <Link href="#">
                  <i className="fa-solid fa-gear"></i>
                </Link>
                <Link href="/controller/logout.php">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <section className="profile-content">
        <div className="left-filter">
          <div className="filter-top">
            <span>Filter</span>
            <input type="button" value="Reset Filter" />
          </div>
          <div className="filter">
            <div className="filter-category">
              <p>Category</p>
              <input type="checkbox" id="late-night-party" />
              <label htmlFor="late-night-party">Late Night Party</label>
              <br />
              <input type="checkbox" id="late-night-concert" />
              <label htmlFor="late-night-concert">Late Night Concert</label>
              <br />
              <input type="checkbox" id="day-long-concert" />
              <label htmlFor="day-long-concert">Day Long Concert</label>
              <br />
              <input type="checkbox" id="reunion" />
              <label htmlFor="reunion">Reunion</label>
              <br />
              <input type="checkbox" id="conference" />
              <label htmlFor="conference">Conference</label>
              <br />
              <hr />
            </div>
            <div className="weekday">
              <p>Weekday</p>
              {[
                "Saturday",
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ].map((day) => (
                <div key={day}>
                  <input type="checkbox" id={day} />
                  <label htmlFor={day}>{day}</label>
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right_content">
          <span className="r-title">Upcoming Events</span>
          <div className="filtered-event">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="event-card-horizontal">
                <div className="event-card-image">
                  <img src="/asset/image/cart-img-1.jpg" alt="Event Image" />
                </div>
                <div className="event-card-content">
                  <div className="event-card-content-inner">
                    <div className="event-card-schedule">
                      <div className="event-date">
                        <p>OCT</p>
                        <span>19</span>
                      </div>
                      <span>7PM</span>
                    </div>
                    <div className="event-details">
                      <h4>Blues on the Beach</h4>
                      <h6>📍Santa Cruz Boardwalk</h6>
                      <div className="event-price">
                        <h4>$45 - $130</h4>
                        <input
                          type="button"
                          value="Book Now"
                          className="book-now-button"
                          onClick={() =>
                            (window.location.href =
                              "/Venue_Details_feature/venuedetails.html")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <link rel="stylesheet" href="/asset/CSS/style.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <script src="/asset/Javascript/index.js"></script>
    </>
  );
}

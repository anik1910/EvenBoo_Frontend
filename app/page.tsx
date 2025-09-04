import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-container">
        <div className="left-hero">
          <p id="h-s-text">IGNITE YOUR PASSION</p>
          <h1>
            Book Your Spot at the Hottest <span>Events</span> Around You
          </h1>
          <p>
            Love concerts, workshops, or exclusive shows? Don't miss a beat!
            Discover top events near you and grab your ticket before it's gone.
          </p>

          <Button>Hello</Button>

          <Link href="/login">
            <input
              type="button"
              className="Explore-btn"
              value="Explore Events"
            />
          </Link>
        </div>

        <div className="right-hero">
          <Image
            src="/pre-book-img-1.png"
            alt="Event booking preview"
            width={500}
            height={644}
          />

          <div className="right-hero-cart-details">
            <div className="hero-cart">
              <div className="time-span">
                <span>Aug</span>
                <span className="span-date">15</span>
              </div>

              <div className="hero-cart-details">
                <h3>Electric Groove Carnival</h3>
                <h6>📍Coachella Valley</h6>
              </div>
            </div>

            <Link href="/login">
              <input
                type="button"
                className="pre-book-btn"
                value="Pre-book Now"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <div id="cart-scroll">
        <section>
          <div className="upcomming-event">
            <div className="upcomming-event-top">
              <h3>Upcoming Events</h3>
              <div className="filter-buttons">
                <input type="button" value="Weekday" className="filter-btn1" />
                <input type="button" value="Category" className="filter-btn2" />
              </div>
            </div>
          </div>

          {/* Event Cards Row 1 */}
          <div className="event-cart">
            {[1, 2, 3].map((item) => (
              <div key={item} className="event-cart-singular">
                <div className="event-cart-image">
                  <Image
                    src="/cart-img-1.jpg"
                    alt="Blues on the Beach event"
                    width={380}
                    height={240}
                  />
                </div>

                <div className="event-cart1">
                  <div className="event-cart1-info">
                    <div className="schedule-info">
                      <div className="date-span">
                        <p>OCT</p>
                        <span>19</span>
                      </div>
                      <span>7PM</span>
                    </div>

                    <div className="event-cart-info">
                      <h4>Blues on the Beach</h4>
                      <h6>📍Santa Cruz Boardwalk</h6>

                      <div className="price-info">
                        <h4>$45 - $130</h4>
                        <Link href={`/events/${item}`} passHref>
                          <input
                            type="button"
                            value="Book Now"
                            className="book-now-btn"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Cards Row 2 */}
          <div className="event-cart">
            {[1, 2, 3].map((item) => (
              <div key={item} className="event-cart-singular">
                <div className="event-cart-image">
                  <Image
                    src="/cart-img-1.jpg"
                    alt="Blues on the Beach event"
                    width={380}
                    height={240}
                  />
                </div>

                <div className="event-cart1">
                  <div className="event-cart1-info">
                    <div className="schedule-info">
                      <div className="date-span">
                        <p>OCT</p>
                        <span>19</span>
                      </div>
                      <span>7PM</span>
                    </div>

                    <div className="event-cart-info">
                      <h4>Blues on the Beach</h4>
                      <h6>📍Santa Cruz Boardwalk</h6>

                      <div className="price-info">
                        <h4>$45 - $130</h4>
                        <Link href="/login">
                          <input
                            type="button"
                            value="Book Now"
                            className="book-now-btn"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* News and Blogs */}
      <section className="news-section" id="news-blog">
        <div className="news-header-text">
          <span>NEWS AND BLOGS</span>
          <h3>Stay Updated with Our Event Insights</h3>
        </div>
        <div className="news-see-more-btn">
          <input type="button" value="See More" />
        </div>
      </section>

      {/* News Cart */}
      <section>
        <div className="news-cart">
          {/* News Cart 1 */}
          <div className="news-cart1">
            <div className="news-img">
              <Image
                src="/right-img.jpg"
                alt="Virtual events article"
                width={526}
                height={300}
              />
            </div>

            <div className="news-cart-bottom">
              <div className="news-cart-info">
                <span>June 24, 2025</span>
                <p>The Rise of Virtual Events: A New Era in Entertainment</p>
              </div>

              <div className="read-more-btn">
                <input type="button" value="Read more" />
              </div>
            </div>
          </div>

          {/* News Cart 2 */}
          <div className="news-cart1">
            <div className="news-img">
              <Image
                src="/right-img.jpg"
                alt="Virtual events article"
                width={526}
                height={300}
              />
            </div>

            <div className="news-cart-bottom">
              <div className="news-cart-info">
                <span>June 24, 2025</span>
                <p>The Rise of Virtual Events: A New Era in Entertainment</p>
              </div>

              <div className="read-more-btn">
                <input type="button" value="Read more" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

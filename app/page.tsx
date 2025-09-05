import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="bg-[#14171c]">
        {/* Hero Section */}
        <section className="flex items-center gap-24 mx-36">
          <div className="flex flex-col w-[552px] gap-4">
            <p className="text-[#b6e82e] text-lg font-semibold italic">
              IGNITE YOUR PASSION
            </p>
            <h1 className="text-6xl leading-tight text-white">
              Book Your Spot at the Hottest{" "}
              <span className="text-[#b6e82e] font-light italic">Events</span>{" "}
              Around You
            </h1>
            <p className="text-xl font-normal mt-4 text-white">
              Love concerts, workshops, or exclusive shows? Don't miss a beat!
              Discover top events near you and grab your ticket before it's
              gone.
            </p>

            <Link href="/login">
              <input
                type="button"
                className="h-14 w-52 rounded-xl bg-[#b6e82e] text-lg font-bold mt-4 transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
                value="Explore Events"
              />
            </Link>
          </div>

          <div className="rounded-[30px] border-t-4 border-b-4 border-[#b6e82e] flex flex-col relative mt-8">
            <Image
              src="/pre-book-img-1.png"
              alt="Event booking preview"
              width={500}
              height={644}
              className="w-full h-[644px] object-cover overflow-hidden rounded-[30px]"
            />

            <div className="absolute bottom-0 w-full flex flex-col items-center gap-6 mb-8">
              <div className="flex gap-6">
                <div className="flex flex-col w-[18%] h-[12%] justify-center items-center rounded-lg bg-white text-[#505050] text-2xl font-bold py-8 px-8 ml-12">
                  <span className="text-base">Aug</span>
                  <span className="text-2xl font-bold">15</span>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-[34px] font-bold text-white">
                    Electric Groove Carnival
                  </h3>
                  <h6 className="text-sm font-semibold text-[#b6e82e]">
                    📍Coachella Valley
                  </h6>
                </div>
              </div>

              <Link href="/login">
                <input
                  type="button"
                  className="w-[100%] h-14 rounded-xl text-lg font-bold transition-all duration-300 hover:bg-[#b6e82e] cursor-pointer border-none bg-white text-black px-8 py-4"
                  value="Pre-book Now"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <div id="cart-scroll" className="scroll-smooth">
          <section>
            <div className="mx-36 mt-20">
              <div className="flex justify-between items-center mb-20">
                <h3 className="text-[38px] font-bold text-white">
                  Upcoming Events
                </h3>
                <div className="flex gap-4 items-center">
                  <input
                    type="button"
                    value="Weekday"
                    className="h-12 w-44 text-white bg-[#b6e82e10] rounded-xl border border-[#b6e82e14]"
                  />
                  <input
                    type="button"
                    value="Category"
                    className="h-12 w-44 text-white bg-[#b6e82e10] rounded-xl border border-[#b6e82e14]"
                  />
                </div>
              </div>
            </div>

            {/* Event Cards Row 1 */}
            <div className="flex gap-8 mx-36 mt-20">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border border-[#dadada10] bg-[#0b0b0b1e] rounded-2xl w-[380px] h-[432px]"
                >
                  <div className="h-60 w-full overflow-hidden">
                    <Image
                      src="/cart-img-1.jpg"
                      alt="Blues on the Beach event"
                      width={380}
                      height={240}
                      className="h-full w-full object-cover rounded-t-2xl"
                    />
                  </div>

                  <div className="mx-6 my-6 mb-9">
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-10">
                        <div className="flex flex-col">
                          <p className="text-base font-normal text-white">
                            OCT
                          </p>
                          <span className="text-2xl font-bold text-white">
                            19
                          </span>
                        </div>
                        <span className="text-base font-normal text-white">
                          7PM
                        </span>
                      </div>

                      <div className="flex flex-col gap-4">
                        <h4 className="text-2xl font-bold text-white">
                          Blues on the Beach
                        </h4>
                        <h6 className="text-base font-medium text-[#b6e82e]">
                          📍Santa Cruz Boardwalk
                        </h6>

                        <div className="flex gap-[18px] text-[#b6e82e] items-center">
                          <h4 className="text-base">$45 - $130</h4>
                          <Link href={`/events/${item}`} passHref>
                            <input
                              type="button"
                              value="Book Now"
                              className="h-10 w-32 rounded-xl bg-[#b6e82e10] border border-[#b6e82e14] text-[#b6e82e] font-medium text-base transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
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
            <div className="flex gap-8 mx-36 mt-20">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border border-[#dadada10] bg-[#0b0b0b1e] rounded-2xl w-[380px] h-[432px]"
                >
                  <div className="h-60 w-full overflow-hidden">
                    <Image
                      src="/cart-img-1.jpg"
                      alt="Blues on the Beach event"
                      width={380}
                      height={240}
                      className="h-full w-full object-cover rounded-2xl"
                    />
                  </div>

                  <div className="mx-6 my-6 mb-9">
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-10">
                        <div className="flex flex-col">
                          <p className="text-base font-normal text-white">
                            OCT
                          </p>
                          <span className="text-2xl font-bold text-white">
                            19
                          </span>
                        </div>
                        <span className="text-base font-normal text-white">
                          7PM
                        </span>
                      </div>

                      <div className="flex flex-col gap-4">
                        <h4 className="text-2xl font-bold text-white">
                          Blues on the Beach
                        </h4>
                        <h6 className="text-base font-medium text-[#b6e82e]">
                          📍Santa Cruz Boardwalk
                        </h6>

                        <div className="flex gap-[18px] text-[#b6e82e] items-center">
                          <h4 className="text-base">$45 - $130</h4>
                          <Link href="/login">
                            <input
                              type="button"
                              value="Book Now"
                              className="h-10 w-32 rounded-xl bg-[#b6e82e10] border border-[#b6e82e14] text-[#b6e82e] font-medium text-base transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
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
        <section className="mx-36 mt-20" id="news-blog">
          <div className="flex items-center justify-center gap-48">
            <div>
              <span className="text-lg font-medium text-[#b6e82e]">
                NEWS AND BLOGS
              </span>
              <h3 className="text-[38px] font-bold text-white">
                Stay Updated with Our Event Insights
              </h3>
            </div>
            <div>
              <input
                type="button"
                value="See More"
                className="w-40 h-14 rounded-xl bg-[#b6e82e] text-lg font-bold mt-7 border-none cursor-pointer text-black"
              />
            </div>
          </div>
        </section>

        {/* News Cart */}
        <section>
          <div className="flex gap-6 mx-36 mt-20">
            {/* News Cart 1 */}
            <div className="w-[526px] h-[428px] rounded-[20px] bg-[#0b0b0b1e] p-4">
              <div>
                <Image
                  src="/right-img.jpg"
                  alt="Virtual events article"
                  width={526}
                  height={300}
                  className="rounded-[20px]"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-[#b9b9b9] text-base font-medium">
                    June 24, 2025
                  </span>
                  <p className="text-[22px] font-semibold text-white mt-2">
                    The Rise of Virtual Events: A New Era in Entertainment
                  </p>
                </div>

                <input
                  type="button"
                  value="Read more"
                  className="bg-[#b6e82e10] text-[#b6e82e] rounded-xl border border-[#b6e82e] w-32 h-11 text-sm font-semibold transition-all duration-300 hover:bg-[#b6e82e] hover:text-black cursor-pointer"
                />
              </div>
            </div>

            {/* News Cart 2 */}
            <div className="w-[526px] h-[428px] rounded-[20px] bg-[#0b0b0b1e] p-4">
              <div>
                <Image
                  src="/right-img.jpg"
                  alt="Virtual events article"
                  width={526}
                  height={300}
                  className="rounded-[20px]"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-[#b9b9b9] text-base font-medium">
                    June 24, 2025
                  </span>
                  <p className="text-[22px] font-semibold text-white mt-2">
                    The Rise of Virtual Events: A New Era in Entertainment
                  </p>
                </div>

                <input
                  type="button"
                  value="Read more"
                  className="bg-[#b6e82e10] text-[#b6e82e] rounded-xl border border-[#b6e82e] w-32 h-11 text-sm font-semibold transition-all duration-300 hover:bg-[#b6e82e] hover:text-black cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type UserInfo = { fullName: string };

interface DashboardProps {
  params: { userID: string };
}

export default function Dashboard({ params }: DashboardProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("http://localhost:8080/auth/me", {
          withCredentials: true,
        });
        setUser({ fullName: response.data.fullName });
      } catch (error) {
        router.push("/login");
      }
    }
    fetchUser();
  }, [router]);

  if (!user) return null;

  return (
    <>
      <div className="bg-[#14171c]">
        <h2 className="text-2xl font-bold text-white mx-68 py-10">
          Welcome, {user.fullName}!
        </h2>
        <section className="container mx-auto flex gap-8 px-24 ">
          <main className="w-3/4 mx-auto bg-[#b6e82e14] rounded-2xl p-6 text-white border-2 border-[#b6e82e]">
            <div className="flex flex-col gap-6">
              {[1, 2, 3, 4].map((event) => (
                <article
                  key={event}
                  className="event-card-horizontal flex bg-[#0b0b0b33] rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="w-2/5 overflow-hidden">
                    <img
                      src="/cart-img-1.jpg"
                      alt="Event Image"
                      className="object-cover w-full h-full rounded-l-xl"
                    />
                  </div>
                  <div className="w-3/5 p-6 flex flex-col justify-between">
                    <div className="flex gap-8">
                      <div className="event-schedule flex flex-col items-center text-[#b6e82e] font-semibold">
                        <div className="text-lg">OCT</div>
                        <div className="text-3xl">19</div>
                        <div className="text-base">7PM</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          Blues on the Beach
                        </h3>
                        <p className="text-sm text-[#b6e82e]">
                          📍 Santa Cruz Boardwalk
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-[#b6e82e] text-lg">$45 - $130</div>
                      <button
                        onClick={() =>
                          (window.location.href = "/venuedetails.html")
                        }
                        className="book-now-button bg-[#b6e82e14] border border-[#b6e82e] text-[#b6e82e] rounded-lg px-4 py-2 hover:bg-[#b6e82e] hover:text-black transition text-sm font-semibold"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </section>
      </div>
    </>
  );
}

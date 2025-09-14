"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export default function EventMePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('jwtToken');
        if (!token) {
          setError("Please login first - No authentication token found");
          setLoading(false);
          setTimeout(() => {
            router.push("/Organizer/Login");
          }, 1500);
          return;
        }

        const response = await axios.get("http://localhost:8000/organizer/functions/me", {
          timeout: 10000,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        console.log('My Events response:', response.data);
        setEvents(response.data);

      } catch (err: any) {
        console.error("Error fetching events:", err);

        if (err.code === 'ECONNABORTED') {
          setError("Request timeout. Please try again.");
        } else if (err.response?.status === 401) {
          setError("Please login first - Invalid authentication token");
          localStorage.removeItem('jwtToken');
          setTimeout(() => {
            router.push("/Organizer/Login");
          }, 1500);
        } else if (err.response?.status === 403) {
          setError("Access forbidden - Please login again");
          localStorage.removeItem('jwtToken');
          setTimeout(() => {
            router.push("/Organizer/Login");
          }, 1500);
        } else if (err.response) {
          setError(err.response.data?.message || `Server error: ${err.response.status}`);
        } else if (err.request) {
          setError("Network error. Please check your connection and try again.");
        } else {
          setError("Failed to load events data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [router]);

  const handleBackToProfile = () => {
    router.push("/Organizer/Profile");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">My Events</h1>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-lime-400 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-lime-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-4 h-4 bg-lime-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <p className="text-gray-300 mt-4">Loading your events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">My Events</h1>
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-center">Error: {error}</p>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => router.push("/Organizer/Login")}
              className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Go to Login
            </button>
            <button 
              onClick={handleBackToProfile}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">My Events</h1>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <button 
              onClick={handleBackToProfile}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Back to Profile
            </button>
            <button 
              onClick={handleRefresh}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Refresh Events
            </button>
            <Link href="/Organizer/Event">
              <button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-200">
                Create New Event
              </button>
            </Link>
          </div>
        </div>

        {events && events.length > 0 ? (
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Total Events: {events.length}</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">ID</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Title</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Description</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr 
                      key={event.id} 
                      className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition duration-150 ${
                        index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'
                      }`}
                    >
                      <td className="py-4 px-4 text-gray-300">{event.id}</td>
                      <td className="py-4 px-4 text-white font-medium">{event.title}</td>
                      <td className="py-4 px-4 text-gray-300 max-w-xs">
                        {event.description?.length > 50 
                          ? `${event.description.substring(0, 50)}...` 
                          : event.description || 'No description'}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-gray-300">{event.location || 'No location'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h8a2 2 0 002-2V11M5 11h14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Events Found</h3>
              <p className="text-gray-400 mb-6">You haven't created any events yet. Would you like to create your first event?</p>
            </div>
            <Link href="/Organizer/Event">
              <button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition duration-200 inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Your First Event
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
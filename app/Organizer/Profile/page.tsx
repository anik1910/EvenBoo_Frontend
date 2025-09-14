"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface UserInfo {
  id: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      console.log('Fetching user data...');
      
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        setError("Please login first - No authentication token found");
        setLoading(false);
        setTimeout(() => {
          router.push("./Login");
        }, 1500);
        return;
      }

      const response = await axios.get("http://localhost:8000/Organizer/profile/me", {
        timeout: 10000,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Profile response:', response.data);
      
      if (response.status === 200) {
        setUserInfo(response.data);
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      
      if (error.code === 'ECONNABORTED') {
        setError("Request timeout. Please try again.");
      } 
      else if (error.response?.status === 401) {
        setError("Please login first - Invalid authentication token");
        localStorage.removeItem('jwtToken'); 
        setTimeout(() => {
          router.push("/Login");
        }, 1500);
      } 
      else if (error.response?.status === 403) {
        setError("Access forbidden - Please login again");
        localStorage.removeItem('jwtToken');
        setTimeout(() => {
          router.push("/Login");
        }, 1500);
      } 
      else if (error.response) {
        setError(error.response.data?.message || `Server error: ${error.response.status}`);
      } 
      else if (error.request) {
        setError("Network error. Please check your connection and try again.");
      } 
      else {
        setError("Failed to load user information");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMyEvents = () => {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
      alert("Please login first to access your events");
      router.push("./Login");
      return;
    }
    
    router.push("./EventMe");
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('jwtToken');
      router.push("./Login");
    } catch (error: any) {
      console.error('Logout error:', error);
      localStorage.removeItem('jwtToken');
      router.push("./Login");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        setError("Please login first - No authentication token found");
        return;
      }

      const response = await axios.delete("http://localhost:8000/organizer/account", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200 || response.status === 204) {
        alert("Account deleted successfully!");
        localStorage.removeItem('jwtToken');
        router.push("/Login");
      }
    } catch (error: any) {
      console.error('Account deletion error:', error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError("Authentication failed - Please login again");
        localStorage.removeItem('jwtToken');
        setTimeout(() => {
          router.push("/Login");
        }, 1500);
      } else if (error.response) {
        setError(error.response.data?.message || `Server error: ${error.response.status}`);
      } else {
        setError("Failed to delete account. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
            <span className="text-white text-lg">Loading user information...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center">
          <div className="mb-6">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Error</h3>
            <p className="text-red-400 mb-6">{error}</p>
          </div>
          <button
            onClick={() => router.push("/Organizer/Login")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white text-center">Profile</h1>
        </div>

        {userInfo && (
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  {userInfo.image ? (
                    <img 
                      src={
                        userInfo.image.startsWith("http")
                          ? userInfo.image
                          : `http://localhost:8000/${userInfo.image.startsWith("uploads/") ? userInfo.image : "uploads/" + userInfo.image}`
                      }
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-gray-400">No image</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <p className="text-white text-lg">{userInfo.fullname}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <p className="text-white text-lg">{userInfo.email}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <p className="text-white text-lg">{userInfo.phoneNumber}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Registration Date</label>
                    <p className="text-white text-lg">
                      {userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Updated</label>
                  <p className="text-white text-lg">
                    {userInfo.updatedAt ? new Date(userInfo.updatedAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Actions</h2>

          {(() => {
            const baseButton =
              "w-full text-white font-semibold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center space-x-2";

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/Organizer/Event">
                  <button className={`${baseButton} bg-blue-600 hover:bg-blue-700`}>
                    <span>Create Event</span>
                  </button>
                </Link>

                <button 
                  onClick={handleMyEvents}
                  className={`${baseButton} bg-green-600 hover:bg-green-700`}
                >
                  <span>My Events</span>
                </button>

                <Link href="/Organizer/Password">
                  <button className={`${baseButton} bg-yellow-600 hover:bg-yellow-700`}>
                    <span>Change Password</span>
                  </button>
                </Link>

                <button 
                  onClick={handleDeleteAccount}
                  className={`${baseButton} bg-red-500 hover:bg-red-600`}
                >
                  <span>Delete Account</span>
                </button>

                <button 
                  onClick={handleLogout}
                  className={`${baseButton} bg-gray-600 hover:bg-gray-700`}
                >
                  <span>Logout</span>
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
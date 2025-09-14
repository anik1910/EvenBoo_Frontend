'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function EventForm() {
  const router = useRouter();
  
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    console.log('=== TOKEN DEBUG INFO ===');
    console.log('Raw token from localStorage:', storedToken);
    console.log('Token exists:', !!storedToken);
    console.log('Token length:', storedToken ? storedToken.length : 0);
    
    if (storedToken) {
      setToken(storedToken);
      console.log('Token set successfully');
      console.log('Token preview (first 50 chars):', storedToken.substring(0, 50) + '...');
      
      testTokenValidity(storedToken);
    } else {
      console.log('No token found in localStorage');
      setError('Authentication token not found. Please login first.');
    }
  }, []);

  const testTokenValidity = async (token: string) => {
    try {
      console.log('Testing token validity...');
      const response = await axios.get("http://localhost:8000/Organizer/profile/me", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log('Token is valid - Profile response:', response.status);
    } catch (error: any) {
      console.log('Token validation failed:', error.response?.status, error.response?.data);
      if (error.response?.status === 401) {
        setError('Invalid authentication token. Please login again.');
        localStorage.removeItem('jwtToken');
        setTimeout(() => {
          router.push('/Login');
        }, 2000);
      }
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title || !description || !date || !location) {
      setError('All fields are required');
      return;
    } 
    
    if (!isValidDate(date)) {
      setError('Please select a valid future date and time');
      return;
    }

    if (!token) {
      setError('Authentication token is required. Please login first.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const isoDate = new Date(date).toISOString();
      console.log('=== API REQUEST DEBUG ===');
      console.log('Sending data:', { title, description, date: isoDate, location });
      console.log('Token being used:', token ? `${token.substring(0, 50)}...` : 'NO TOKEN');
      console.log('Authorization header:', `Bearer ${token}`);
      
      const eventData = {
        title,
        description,
        date: isoDate,
        location
      };

      console.log('Event data being sent:', eventData);
      console.log('API Endpoint:', "http://localhost:8000/organizer/function");

      const res = await axios.post("http://localhost:8000/organizer/function", eventData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        timeout: 10000,
      });

      console.log('Success! Response:', res.data);
      
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setError('');
      
      alert('Event created successfully!');

    } catch (err: any) {
      console.error('=== API ERROR DEBUG ===');
      console.error('Full error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      console.error('Error headers:', err.response?.headers);
      
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        
        if (err.response.status === 401) {
          setError('Authentication failed. Token may be expired or invalid. Please login again.');
          localStorage.removeItem('jwtToken');
          setTimeout(() => {
            router.push('/Login');
          }, 2000);
        } else if (err.response.status === 404) {
          setError(`API endpoint not found. Please check if the server endpoint '/organizer/function' exists.`);
        } else {
          setError(`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`);
        }
      } else if (err.request) {
        console.error('No response received:', err.request);
        setError('No response from server. Please check if the server is running.');
      } else {
        console.error('Error message:', err.message);
        setError(`Request failed: ${err.message}`);
      }
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        localStorage.removeItem('jwtToken');
        setTimeout(() => {
          router.push('/Login');
        }, 1500);
      } else if (err.response?.status === 403) {
        setError('Access denied. You do not have permission to create events.');
        localStorage.removeItem('jwtToken');
        setTimeout(() => {
          router.push('/Login');
        }, 1500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setError('');
  };

  const isValidDate = (date: string): boolean => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const now = new Date();
    return selectedDate >= now && !isNaN(selectedDate.getTime());
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white text-center">Create Event</h1>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleChangeTitle}
                required
                disabled={isLoading}
                placeholder="Enter event title"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChangeDescription}
                required
                disabled={isLoading}
                rows={4}
                placeholder="Enter event description"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-white mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={date}
                onChange={handleChangeDate}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={handleChangeLocation}
                required
                disabled={isLoading}
                placeholder="Enter event location"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/50 border border-red-500 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 text-white font-semibold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reset</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-semibold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create Event</span>
                  </>
                )}
              </button>
            </div>
            <div className="pt-4 border-t border-gray-600">
              <button
                type="button"
                onClick={() => router.push('./Profile')}
                disabled={isLoading}
                className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 text-white font-semibold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
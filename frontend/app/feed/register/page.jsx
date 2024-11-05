"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/compat/router'
import { useSearchParams } from 'next/navigation'

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const eventId = searchParams.get('eventId')


  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event details based on the eventId
  useEffect(() => {
    if (!eventId) return; // Wait until eventId is available

    const fetchEvent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`);
        if (!response.ok) throw new Error('Event not found');
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]); // Trigger the effect when eventId is available

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., send registration data to the server)
    alert("Registration submitted!");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event found</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p className="mt-2 text-gray-600">{event.description}</p>
      <form onSubmit={handleRegister} className="mt-4">
        {/* Registration form fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input type="text" id="name" required className="border border-gray-300 p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input type="email" id="email" required className="border border-gray-300 p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}

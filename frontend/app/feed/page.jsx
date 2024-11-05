// feed/page.jsx
"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/ui/eventCard"; // Import the EventCard component

export default function Feed() {
  const [events, setEvents] = useState([]);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event._id} event={event} />  
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
}

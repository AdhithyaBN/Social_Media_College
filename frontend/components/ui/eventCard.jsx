// components/ui/eventCard.jsx
"use client";
import { Carousel, CarouselContent, CarouselItem } from "./carousel"; // Import your Carousel components
import { CalendarIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/outline'; // Import relevant icons
import Link from 'next/link'; // Import Link from next/link

export default function EventCard({ event }) {
    console.log(event._id);
  return (
    <Link href={{ pathname: '/feed/register', query: { eventId: event._id } }} passHref>
      <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-gray-100 transition-shadow duration-200 ease-in-out cursor-pointer">
        {/* Carousel Section */}
        <Carousel className="relative" orientation="horizontal">
          <CarouselContent>
            {event.media && event.media.length > 0 ? (
              event.media.map((mediaItem, index) => (
                <CarouselItem key={index}>
                  {/* Assuming mediaItem could be either image or video */}
                  {mediaItem.type === "image" ? (
                    <img
                      src={mediaItem.url}
                      alt={event.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={mediaItem.url}
                      controls
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg">
                  <p className="text-gray-600">No Media Available</p>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>

        {/* Event Details Section */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-800 transition-colors duration-200 ease-in-out">
            {event.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1 flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-600 mr-2" />
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mt-1 flex items-center">
            <LocationMarkerIcon className="h-5 w-5 text-gray-600 mr-2" />
            <strong>Location:</strong> {event.location}
          </p>
          <p className="mt-2 text-gray-700">{event.description}</p>
          <div className="mt-4 p-2 border-l-4 border-gray-500 bg-gray-50 rounded">
            <p className="text-sm text-gray-600 flex items-center">
              <UsersIcon className="h-5 w-5 text-gray-600 mr-2" />
              <strong>Organized by:</strong> {event.organizedBy.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>College:</strong> {event.organizedBy.college?.name || "Unknown College"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}


import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const businesses = [
  { name: "Splash Pool Services", city: "Miami, Florida", emoji: "🏊" },
  { name: "Clear Waters Pool Care", city: "Orlando, Florida", emoji: "💧" },
  { name: "Blue Lagoon Pools", city: "Tampa, Florida", emoji: "🌊" },
  { name: "Sunshine Pool Maintenance", city: "Jacksonville, Florida", emoji: "☀️" },
  { name: "Gulf Coast Pools", city: "Naples, Florida", emoji: "🐬" },
  { name: "Ocean Breeze Restaurant", city: "Fort Lauderdale, Florida", emoji: "🍽️" },
  { name: "Sunrise Café", city: "Key West, Florida", emoji: "☕" },
  { name: "Palm Beach Bistro", city: "Palm Beach, Florida", emoji: "🥗" },
  { name: "Miami Fusion Kitchen", city: "Miami, Florida", emoji: "🍜" },
  { name: "Fluffy Paws Pet Grooming", city: "Gainesville, Florida", emoji: "🐕" },
  { name: "Happy Tails Pet Care", city: "Tallahassee, Florida", emoji: "🐾" },
  { name: "Pampered Pets Salon", city: "Pensacola, Florida", emoji: "✂️" },
  { name: "Glamour Nails Spa", city: "Sarasota, Florida", emoji: "💅" },
  { name: "Perfect Polish Studio", city: "St. Petersburg, Florida", emoji: "✨" },
  { name: "Luxury Nails & Spa", city: "Boca Raton, Florida", emoji: "💎" },
  { name: "Style Cut Hair Salon", city: "Clearwater, Florida", emoji: "💇" },
  { name: "Fresh Look Barbershop", city: "Lakeland, Florida", emoji: "💈" },
  { name: "Trendy Cuts Studio", city: "Fort Myers, Florida", emoji: "✂️" },
  { name: "Elite Hair Design", city: "West Palm Beach, Florida", emoji: "🎨" },
  { name: "Quick Fix Auto Repair", city: "Ocala, Florida", emoji: "🔧" },
  { name: "Pro Tire & Service", city: "Daytona Beach, Florida", emoji: "🚗" },
  { name: "Sunshine Auto Care", city: "Melbourne, Florida", emoji: "🌞" },
  { name: "FastLane Mechanics", city: "Kissimmee, Florida", emoji: "⚡" },
];

export const BusinessCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Randomize the starting business
    setCurrentIndex(Math.floor(Math.random() * businesses.length));
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % businesses.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full mt-4">
      <Carousel className="w-full">
        <CarouselContent>
          {businesses.map((business, index) => (
            <CarouselItem key={index} className={`${index === currentIndex ? 'block' : 'hidden'}`}>
              <div className="text-sm text-[#1a4b8a] bg-[#e3f0ff] p-3 rounded-lg">
                <span className="mr-2">{business.emoji}</span>
                <span className="font-medium">{business.name}</span>
                <span className="text-[#1a4b8a]/70"> from {business.city} just completed the quiz</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

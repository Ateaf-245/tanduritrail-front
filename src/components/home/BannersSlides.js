import React, { useEffect } from "react";
import { Banners } from "../../constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BannerSlides() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const totalSlides = Banners.length;

  // Auto Slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [totalSlides]);

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full overflow-hidden ">
      
       {/* Buttons Inside Banner Div */}
       <button
              onClick={goToPrev}
              className="absolute top-1/2 lg:size-10 size-7 left-4 -translate-y-1/2 bg-transparent text-white rounded-full shadow-lg z-10"
            >
              <ChevronLeft className="lg:size-8 size-5"/>
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2  lg:size-10 size-7 right-4 -translate-y-1/2 bg-transparent text-white rounded-full shadow-lg  z-10"
            >
              <ChevronRight className=" lg:size-8 size-5" />
            </button>
        

      {/* Banner images loop */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Banners.map((banner, index) => (
          <div
            key={index}
            className="relative flex-none w-full lg:h-screen h-full"
          >
            {/* Banner Image */}
            <img
              src={banner.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {Banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index
                ? "bg-white border border-gray-500"
                : "bg-gray-500 border border-white"
            } hover:scale-110 transition-transform`}
          ></button>
        ))}
      </div>
    </div>
  );
}

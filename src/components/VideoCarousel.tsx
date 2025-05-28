import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const videos = [
  {
    title: "Certinia Integration",
    type: "youtube",
    videoId: "XqXclAHMa4A",
    thumbnail: "https://img.youtube.com/vi/XqXclAHMa4A/maxresdefault.jpg",
  },
  {
    title: "Salesforce Integration",
    type: "placeholder",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Xero Sync Demo",
    type: "placeholder",
    image: "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "MYOB Connection",
    type: "placeholder",
    image: "https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Shopify Integration",
    type: "placeholder",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function VideoCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [playingVideo, setPlayingVideo] = React.useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      setPlayingVideo(false);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
  });

  const handlePlayVideo = () => {
    setPlayingVideo(true);
  };

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider h-[400px] rounded-xl overflow-hidden">
        {videos.map((video, idx) => (
          <div key={idx} className="keen-slider__slide relative">
            {video.type === "youtube" && playingVideo ? (
              <div className="w-full h-full bg-black">
                <div className="relative w-full h-full">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div 
                className="relative w-full h-full group cursor-pointer"
                onClick={() => video.type === "youtube" && handlePlayVideo()}
              >
                <img
                  src={video.type === "youtube" ? video.thumbnail : video.image}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300">
                  <div className="bg-primary-500 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 text-gray-900" />
                  </div>
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-4">
              <h3 className="text-xl font-semibold text-white">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2">
            {[...Array(videos.length)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                  setPlayingVideo(false);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === idx ? 'bg-primary-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
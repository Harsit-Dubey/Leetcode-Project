// import { useState, useRef, useEffect } from "react";
// import { Pause, Play } from "lucide-react";

// const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);

//   // Format seconds to MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // Update current time during playback
//   useEffect(() => {
//     const video = videoRef.current;

//     const handleTimeUpdate = () => {
//       if (video) setCurrentTime(video.currentTime);
//     };

//     if (video) {
//       video.addEventListener("timeupdate", handleTimeUpdate);
//       return () => video.removeEventListener("timeupdate", handleTimeUpdate);
//     }
//   }, []);

//   return (
//     <div
//       className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {/* Video Element */}
//       <video
//         ref={videoRef}
//         src={secureUrl}
//         poster={thumbnailUrl}
//         onClick={togglePlayPause}
//         className="w-full aspect-video bg-black cursor-pointer"
//       />

//       {/* Video Controls Overlay */}
//       <div
//         className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity ${
//           isHovering || !isPlaying ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlayPause}
//           className="btn btn-circle btn-primary mr-3"
//           aria-label={isPlaying ? "Pause" : "Play"}
//         >
//           {isPlaying ? <Pause /> : <Play />}
//         </button>

//         {/* Progress Bar */}
//         <div className="flex items-center w-full mt-2">
//           <span className="text-white text-sm mr-2">
//             {formatTime(currentTime)}
//           </span>
//           <input
//             type="range"
//             min="0"
//             max={duration}
//             value={currentTime}
//             onChange={(e) => {
//               if (videoRef.current) {
//                 videoRef.current.currentTime = Number(e.target.value);
//               }
//             }}
//             className="range range-primary range-xs flex-1"
//           />
//           <span className="text-white text-sm ml-2">
//             {formatTime(duration)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Editorial;

/////////////////////////////////////////////////////////////////////////////////////////////////
import { useState, useRef, useEffect } from "react";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    video.paused ? video.play() : video.pause();
  };

  const handleVolumeChange = (v) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(v);
    video.volume = v;
    video.muted = v === 0;
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreen = () => {
    const container = videoRef.current?.parentElement;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div
      className="group relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden 
      bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]
      transition-all duration-500 transform hover:scale-[1.02] hover:rotate-x-2 hover:-rotate-y-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Video */}
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        className="w-full aspect-video cursor-pointer"
        onClick={togglePlayPause}
      />

      {/* Center Play */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlayPause}
            className="bg-white/10 backdrop-blur-md border border-white/20 
            p-6 rounded-full hover:scale-110 transition shadow-xl"
          >
            <Play size={30} className="text-white" />
          </button>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-4 py-3 
        bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-md
        transition-all duration-300 ${
          isHovering || !isPlaying
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5"
        }`}
      >
        {/* Progress */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            videoRef.current.currentTime = Number(e.target.value);
          }}
          className="w-full h-1 appearance-none bg-white/20 rounded-lg accent-cyan-400 cursor-pointer"
        />

        {/* Bottom Controls */}
        <div className="flex items-center justify-between mt-3 text-white text-sm">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayPause}
              className="hover:scale-110 transition"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <span className="text-gray-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute}>
                {isMuted || volume === 0 ? (
                  <VolumeX size={18} />
                ) : (
                  <Volume2 size={18} />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-20 h-1 bg-white/20 rounded-lg accent-cyan-400"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 ">
            <select
              value={playbackRate}
              onChange={(e) => {
                const rate = Number(e.target.value);
                setPlaybackRate(rate);
                videoRef.current.playbackRate = rate;
              }}
              className="bg-amber-700/99 backdrop-blur-md border border-white/20 px-4 py-1 rounded-md text-xs text-amber-50 "
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>

            <button
              onClick={handleFullscreen}
              className="hover:scale-110 transition"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editorial;

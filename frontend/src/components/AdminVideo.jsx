// import { useEffect, useState } from "react";
// import axiosClient from "../utils/axiosClient";
// import { NavLink } from "react-router";

// const AdminVideo = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get("/problem/getAllProblem");
//       setProblems(data);
//     } catch (err) {
//       setError("Failed to fetch problems");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this problem?"))
//       return;

//     try {
//       await axiosClient.delete(`/video/delete/${id}`);
//       setProblems(problems.filter((problem) => problem._id !== id));
//     } catch (err) {
//       setError(err);
//       console.log(err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-error shadow-lg my-4">
//         <div>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="stroke-current flex-shrink-0 h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <span>{error.response.data.error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Video Upload and Delete</h1>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="w-1/12">#</th>
//               <th className="w-4/12">Title</th>
//               <th className="w-2/12">Difficulty</th>
//               <th className="w-3/12">Tags</th>
//               <th className="w-2/12">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {problems.map((problem, index) => (
//               <tr key={problem._id}>
//                 <th>{index + 1}</th>
//                 <td>{problem.title}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       problem.difficulty === "Easy"
//                         ? "badge-success"
//                         : problem.difficulty === "Medium"
//                           ? "badge-warning"
//                           : "badge-error"
//                     }`}
//                   >
//                     {problem.difficulty}
//                   </span>
//                 </td>
//                 <td>
//                   <span className="badge badge-outline">{problem.tags}</span>
//                 </td>
//                 <td>
//                   <div className="flex space-x-1">
//                     <NavLink
//                       to={`/admin/upload/${problem._id}`}
//                       className={`btn bg-blue-600`}
//                     >
//                       Upload
//                     </NavLink>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleDelete(problem._id)}
//                       className="btn btn-sm btn-error"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminVideo;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import axiosClient from "../utils/axiosClient";
// import { NavLink } from "react-router";
// import { Play, Trash2 } from "lucide-react";

// const AdminVideo = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [playbackRate, setPlaybackRate] = useState(1);

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get("/problem/getAllProblem");
//       setProblems(data);
//     } catch (err) {
//       setError("Failed to fetch problems");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this problem?"))
//       return;

//     try {
//       await axiosClient.delete(`/video/delete/${id}`);
//       setProblems(problems.filter((p) => p._id !== id));
//     } catch (err) {
//       setError("Delete failed");
//     }
//   };

//   const handlePlay = (videoUrl) => {
//     setSelectedVideo(videoUrl);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-error max-w-xl mx-auto mt-6">
//         <span>{error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
//         🎬 Admin Video Panel
//       </h1>

//       {/* Video Player */}
//       {selectedVideo && (
//         <div className="mb-8 bg-base-200 p-4 rounded-2xl shadow-xl">
//           <video
//             src={selectedVideo}
//             controls
//             className="w-full rounded-xl"
//             playbackRate={playbackRate}
//             onRateChange={(e) => setPlaybackRate(e.target.playbackRate)}
//           />

//           <div className="flex justify-between items-center mt-3">
//             <div>
//               <label className="mr-2 font-semibold">Speed:</label>
//               <select
//                 className="select select-bordered select-sm"
//                 value={playbackRate}
//                 onChange={(e) => {
//                   const rate = Number(e.target.value);
//                   setPlaybackRate(rate);
//                   document.querySelector("video").playbackRate = rate;
//                 }}
//               >
//                 <option value={0.5}>0.5x</option>
//                 <option value={1}>1x</option>
//                 <option value={1.5}>1.5x</option>
//                 <option value={2}>2x</option>
//               </select>
//             </div>

//             <button
//               className="btn btn-sm btn-outline"
//               onClick={() =>
//                 document.querySelector("video").requestFullscreen()
//               }
//             >
//               Fullscreen
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Table */}
//       <div className="overflow-x-auto rounded-2xl shadow-lg">
//         <table className="table w-full">
//           <thead className="bg-base-300">
//             <tr>
//               <th>#</th>
//               <th>Title</th>
//               <th>Difficulty</th>
//               <th>Tags</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {problems.map((problem, index) => (
//               <tr key={problem._id} className="hover">
//                 <td>{index + 1}</td>
//                 <td className="font-semibold">{problem.title}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       problem.difficulty === "Easy"
//                         ? "badge-success"
//                         : problem.difficulty === "Medium"
//                           ? "badge-warning"
//                           : "badge-error"
//                     }`}
//                   >
//                     {problem.difficulty}
//                   </span>
//                 </td>
//                 <td>
//                   <span className="badge badge-outline">{problem.tags}</span>
//                 </td>
//                 <td className="flex gap-2">
//                   <NavLink
//                     to={`/admin/upload/${problem._id}`}
//                     className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
//                   >
//                     Upload
//                   </NavLink>

//                   <button
//                     onClick={() => handlePlay(problem.videoUrl)}
//                     className="btn btn-sm btn-success"
//                   >
//                     <Play size={16} />
//                   </button>

//                   <button
//                     onClick={() => handleDelete(problem._id)}
//                     className="btn btn-sm btn-error"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminVideo;

///////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState, useRef } from "react";
import axiosClient from "../utils/axiosClient";
import { NavLink } from "react-router";
import { Play, Trash2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

const AdminVideo = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get("/problem/getAllProblem");
      setProblems(data);
    } catch {
      setError("Failed to fetch problems");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this problem?")) return;
    try {
      await axiosClient.delete(`/video/delete/${id}`);
      setProblems(problems.filter((p) => p._id !== id));
    } catch {
      setError("Delete failed");
    }
  };

  const handlePlay = (url) => setSelectedVideo(url);

  return (
    <div className="min-h-screen text-shadow-mauve-400 relative overflow-hidden px-6 py-10">
      {/* REAL WATER ANIMATION BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/thumbnails/049/855/240/small/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg')",
          }}
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-w-600/70" />

        {/* WATER RIPPLE EFFECT */}
        <div className="absolute bottom-0 w-full h-1/2 overflow-hidden">
          <div className="absolute inset-0 animate-[wave_6s_linear_infinite] opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.3),transparent_60%)] blur-2xl" />
          <div className="absolute inset-0 animate-[wave_10s_linear_infinite_reverse] opacity-20 bg-[radial-gradient(circle_at_30%_70%,rgba(0,150,255,0.4),transparent_60%)] blur-3xl" />
        </div>
      </div>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-emerald-800 to-lime-800 text-transparent bg-clip-text"
      >
        🦋 Admin Video Panel
      </motion.h1>

      {/* VIDEO PLAYER */}
      {selectedVideo && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-10 p-6 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl"
        >
          <video
            ref={videoRef}
            src={selectedVideo}
            controls
            className="w-full rounded-xl"
          />

          <div className="flex justify-between mt-4">
            <select
              value={playbackRate}
              onChange={(e) => {
                const rate = Number(e.target.value);
                setPlaybackRate(rate);
                videoRef.current.playbackRate = rate;
              }}
              className="bg-black/60 border border-white/20 px-3 py-1 rounded-lg"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>

            <button
              onClick={() => videoRef.current.requestFullscreen()}
              className="px-4 py-1 bg-blue-600 rounded-lg hover:scale-105 transition"
            >
              Fullscreen
            </button>
          </div>
        </motion.div>
      )}

      {/* PROBLEM CARDS */}
      <div className="space-y-5">
        {problems.map((p, i) => (
          <motion.div
            key={p._id}
            whileHover={{ scale: 1.03 }}
            className="flex justify-between items-center p-5 rounded-2xl bg-black/30 backdrop-blur-lg border border-white/50 shadow-xl"
          >
            <div className="flex items-center gap-6">
              <span className="text-lg font-bold">{i + 1}</span>

              <div>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-400">{p.tags}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  p.difficulty === "easy"
                    ? "bg-green-500/20 text-green-400"
                    : p.difficulty === "medium"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-red-500/20 text-red-400"
                }`}
              >
                {p.difficulty}
              </span>
            </div>

            <div className="flex gap-3">
              <NavLink
                to={`/admin/upload/${p._id}`}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-800 rounded-lg hover:scale-110 transition"
              >
                <UploadCloud size={16} /> Upload
              </NavLink>

              <button
                onClick={() => handlePlay(p.videoUrl)}
                className="p-3 bg-cyan-800 rounded-lg hover:scale-110 transition"
              >
                <Play size={16} />
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="p-3 bg-red-800 rounded-lg hover:scale-110 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* ERROR */}
      {error && <div className="text-red-400 text-center mt-6">{error}</div>}

      {/* CUSTOM CSS */}
      <style>{`
        @keyframes wave {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-25px) translateY(10px); }
          100% { transform: translateX(0) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminVideo;

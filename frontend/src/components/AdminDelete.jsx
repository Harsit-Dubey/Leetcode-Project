// import { useEffect, useState } from "react";
// import axiosClient from "../utils/axiosClient";
// import { useNavigate } from "react-router";

// const AdminDelete = () => {
//   const navigate = useNavigate();
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
//       setError("Failed to fetch Problems");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this problem?"))
//       return;

//     try {
//       await axiosClient.delete(`/problem/delete/${id}`);
//       setProblems(problems.filter((problem) => problem._id !== id));
//     } catch (err) {
//       setError("Failed to delete problem");
//       console.error(err);
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
//           <span>{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="conatiner mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Delete Problems</h1>
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
//                       problem.difficulty === "easy"
//                         ? "badge-success"
//                         : problem.difficulty === "medium"
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
//                   <div className="flex space-x-2">
//                     {/* 🔥 EDIT BUTTON */}
//                     <button
//                       onClick={() => navigate(`/admin/update/${problem._id}`)}
//                       className="btn btn-sm btn-warning"
//                     >
//                       Edit
//                     </button>

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

// export default AdminDelete;

/////////////////////////////////////////////////////////////////////////////////////////////
import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router";

const AdminDelete = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get("/problem/getAllProblem");
      setProblems(data);

      const easy = data.filter((p) => p.difficulty === "easy").length;
      const medium = data.filter((p) => p.difficulty === "medium").length;
      const hard = data.filter((p) => p.difficulty === "hard").length;

      setStats({ total: data.length, easy, medium, hard });
    } catch (err) {
      setError("Failed to fetch problems");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this problem?")) return;

    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      const updated = problems.filter((p) => p._id !== id);
      setProblems(updated);

      const easy = updated.filter((p) => p.difficulty === "easy").length;
      const medium = updated.filter((p) => p.difficulty === "medium").length;
      const hard = updated.filter((p) => p.difficulty === "hard").length;

      setStats({ total: updated.length, easy, medium, hard });
    } catch (err) {
      setError("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-green-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-center mt-10">{error}</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
      }}
    >
      {/* 🌑 Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-green-900/60 to-black/95"></div>

      {/* 🌫️ Fog Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_70%)]"></div>

      <div className="relative z-10 container mx-auto p-6">
        {/* 🌲 Heading */}
        <h1
          className="text-5xl text-center font-extrabold mb-12 
        bg-gradient-to-r from-green-300 via-emerald-400 to-teal-500 
        bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.7)]"
        >
          🌲 Admin Delete & Update Problems
        </h1>

        {/* 🌿 Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total", value: stats.total },
            { label: "Easy", value: stats.easy, color: "text-green-400" },
            { label: "Medium", value: stats.medium, color: "text-yellow-300" },
            { label: "Hard", value: stats.hard, color: "text-red-400" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-black/40 backdrop-blur-xl border border-green-500/20 
              rounded-2xl p-6 text-center shadow-lg 
              hover:scale-105 hover:shadow-green-400/40 transition"
            >
              <p className="text-gray-300">{item.label}</p>
              <p className={`text-3xl font-bold ${item.color || "text-white"}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* 🌲 List */}
        <div className="space-y-5">
          {problems.map((problem, index) => (
            <div
              key={problem._id}
              className="bg-black/40 backdrop-blur-xl border border-green-500/20 
              rounded-2xl p-5 flex flex-col md:grid md:grid-cols-12 items-center gap-4 
              hover:scale-[1.02] hover:shadow-green-400/40 transition"
            >
              <div className="col-span-1 text-green-300 font-bold">
                {index + 1}
              </div>

              <div className="col-span-4 font-semibold text-lg">
                {problem.title}
              </div>

              <div className="col-span-2 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    problem.difficulty === "easy"
                      ? "bg-green-800"
                      : problem.difficulty === "medium"
                        ? "bg-yellow-700 text-black"
                        : "bg-red-900"
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>

              <div className="col-span-3 flex flex-wrap gap-2 justify-center">
                {problem.tags.split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-green-800/40 rounded-full border border-green-500/20"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <div className="col-span-2 flex gap-3">
                <button
                  onClick={() => navigate(`/admin/update/${problem._id}`)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-900 to-emerald-600 hover:scale-105 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(problem._id)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-900 to-blue-900 hover:scale-105 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDelete;

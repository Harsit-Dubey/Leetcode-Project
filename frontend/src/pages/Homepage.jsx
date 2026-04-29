// import { useEffect, useState } from "react";
// import { NavLink } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import axiosClient from "../utils/axiosClient";
// import { logoutUser } from "../authSlice";

// function HomePage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: "all",
//     tag: "all",
//     status: "all",
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get("/problem/getAllProblem");
//         setProblems(data);
//       } catch (error) {
//         console.error("Error Fetching Problems", error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get("/problem/problemSolvedByUser");
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error("Error Fetching Solved Problems", error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]); // Clear solved problems on logout
//   };

//   const filteredProblems = problems.filter((problem) => {
//     const difficultyMatch =
//       filters.difficulty === "all" || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === "all" || problem.tags === filters.tag;
//     const statusMatch =
//       filters.status === "all" ||
//       solvedProblems.some((sp) => sp._id === problem._id);
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <div className="min-h-screen bg-base-200">
//       {/* Navigation Bar */}
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost text-xl">
//             LeetCode
//           </NavLink>
//         </div>
//         <div className="flex-none gap-4">
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} className="btn btn-ghost">
//               {user?.firstName}
//             </div>
//             <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>
//               {user.role == "admin" && (
//                 <li>
//                   <NavLink to="/admin">Admin</NavLink>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* main content */}
//       <div className="container max-auto p-4">
//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           {/* New Status Filter */}
//           <select
//             className="select select-bordered"
//             value={filters.status}
//             onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved Problems</option>
//           </select>

//           <select
//             className="select select-bordered"
//             value={filters.difficulty}
//             onChange={(e) =>
//               setFilters({ ...filters, difficulty: e.target.value })
//             }
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select
//             className="select select-bordered"
//             value={filters.tag}
//             onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problems List */}
//         <div className="grid gap-4">
//           {filteredProblems.map((problem) => (
//             <div key={problem._id} className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center justify-between">
//                   <h2 className="card-title">
//                     <NavLink
//                       to={`/problem/${problem._id}`}
//                       className="hover:text-primary"
//                     >
//                       {problem.title}
//                     </NavLink>
//                   </h2>
//                   {solvedProblems.some((sp) => sp._id === problem._id) && (
//                     <div>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       Solved
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-2">
//                   <div
//                     className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}
//                   >
//                     {problem.difficulty}
//                   </div>
//                   <div className="badge badge-info">{problem.tags}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case "easy":
//       return "badge-success";
//     case "medium":
//       return "badge-warning";
//     case "hard":
//       return "badge-error";
//     default:
//       return "badge-neutral";
//   }
// };

// export default HomePage;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { logoutUser } from "../authSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: "all",
    tag: "all",
    status: "all",
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(true);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const problemsPerPage = 5;

  // Fetch Data
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get("/problem/getAllProblem");
        setProblems(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSolved = async () => {
      try {
        const { data } = await axiosClient.get("/problem/problemSolvedByUser");
        setSolvedProblems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProblems();
    if (user) fetchSolved();
  }, [user]);

  // Close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, search]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  // Filtering
  const filteredProblems = problems.filter((p) => {
    const difficultyMatch =
      filters.difficulty === "all" || p.difficulty === filters.difficulty;

    const tagMatch = filters.tag === "all" || p.tags === filters.tag;

    const isSolved = solvedProblems.some((sp) => sp._id === p._id);

    const statusMatch =
      filters.status === "all" ||
      (filters.status === "solved" && isSolved) ||
      (filters.status === "unsolved" && !isSolved);

    const searchMatch = p.title.toLowerCase().includes(search.toLowerCase());

    return difficultyMatch && tagMatch && statusMatch && searchMatch;
  });

  // Pagination
  const indexOfLast = currentPage * problemsPerPage;
  const currentProblems = filteredProblems.slice(
    indexOfLast - problemsPerPage,
    indexOfLast,
  );

  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  const progress =
    problems.length > 0
      ? Math.floor((solvedProblems.length / problems.length) * 100)
      : 0;

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`flex justify-between items-center px-8 py-4 ${
          darkMode ? "bg-black/40 border-white/10" : "bg-white border-gray-200"
        } backdrop-blur-xl border-b shadow`}
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-orange-700 bg-clip-text text-transparent ">
          AlgoWar
        </h1>

        <div className="flex items-center gap-6" ref={dropdownRef}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-1.5 rounded-lg ${
              darkMode ? "bg-white/20" : "bg-gray-200"
            }`}
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            >
              {user?.firstName}
            </button>

            {open && (
              <div
                className={`absolute right-0 mt-3 w-44 rounded-xl ${
                  darkMode ? "bg-black/80" : "bg-white"
                } shadow-lg`}
              >
                {user?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="block px-4 py-2 hover:bg-blue-500/20"
                  >
                    ⚙️ Admin Panel
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-500/20 text-red-500"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`w-72 min-h-screen p-6 ${
            darkMode
              ? "bg-black/40 border-white/10"
              : "bg-white border-gray-200"
          } border-r`}
        >
          <h2 className="text-xl font-bold mb-6">Filters ⚙️</h2>

          {["status", "difficulty", "tag"].map((key) => (
            <div key={key} className="mb-4">
              <p className="text-sm mb-1 text-gray-400 capitalize">{key}</p>

              <select
                value={filters[key]}
                onChange={(e) =>
                  setFilters({ ...filters, [key]: e.target.value })
                }
                className={`w-full p-2 rounded-lg ${
                  darkMode
                    ? "bg-white/10 border border-white/20"
                    : "bg-white border border-gray-300"
                }`}
              >
                {key === "status" && (
                  <>
                    <option className="bg-gray-800 text-white" value="all">
                      All
                    </option>
                    <option className="bg-gray-800 text-white" value="solved">
                      Solved
                    </option>
                    <option className="bg-gray-800 text-white" value="unsolved">
                      Unsolved
                    </option>
                  </>
                )}
                {key === "difficulty" && (
                  <>
                    <option className="bg-gray-800 text-white" value="all">
                      All
                    </option>
                    <option className="bg-gray-800 text-white" value="easy">
                      Easy
                    </option>
                    <option className="bg-gray-800 text-white" value="medium">
                      Medium
                    </option>
                    <option className="bg-gray-800 text-white" value="hard">
                      Hard
                    </option>
                  </>
                )}
                {key === "tag" && (
                  <>
                    <option className="bg-gray-800 text-white" value="all">
                      All
                    </option>
                    <option className="bg-gray-800 text-white" value="array">
                      Array
                    </option>
                    <option
                      className="bg-gray-800 text-white"
                      value="linkedList"
                    >
                      Linked List
                    </option>
                    <option className="bg-gray-800 text-white" value="graph">
                      Graph
                    </option>
                    <option className="bg-gray-800 text-white" value="dp">
                      DP
                    </option>
                  </>
                )}
              </select>
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-6">
          {/* Top */}
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Problems</h2>

            <input
              type="text"
              placeholder="🔍 Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`px-4 py-2 rounded-xl ${
                darkMode
                  ? "bg-white/10 border border-white/20"
                  : "bg-white border border-gray-300"
              }`}
            />
          </div>

          {/* Progress */}
          <p className="mb-2 text-sm">
            {solvedProblems.length} / {problems.length} solved ({progress}%)
          </p>

          <div className="w-full h-2 bg-gray-300 rounded mb-6">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Problems */}
          <div className="grid gap-4">
            {currentProblems.map((p) => {
              const isSolved = solvedProblems.some((sp) => sp._id === p._id);

              return (
                <div
                  key={p._id}
                  className={`p-5 rounded-2xl border transition hover:scale-[1.02]
                    ${
                      darkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-gray-200"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <NavLink
                      to={`/problem/${p._id}`}
                      className="font-semibold text-lg hover:text-blue-500"
                    >
                      {p.title}
                    </NavLink>

                    {isSolved && (
                      <span className="text-green-500 font-medium">
                        ✔ Solved
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 mt-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        p.difficulty === "easy"
                          ? "bg-green-500/20 text-green-400"
                          : p.difficulty === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {p.difficulty}
                    </span>

                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                      {p.tags}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-3 flex-wrap">
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${
        darkMode
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }
      disabled:opacity-40`}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const isActive = currentPage === i + 1;

              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${
            isActive
              ? "bg-yellow-500 text-black shadow-md scale-105"
              : darkMode
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }
        `}
                >
                  {i + 1}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${
        darkMode
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }
      disabled:opacity-40`}
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

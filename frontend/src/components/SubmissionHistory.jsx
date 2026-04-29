// import { useState, useEffect } from "react";
// import axiosClient from "../utils/axiosClient";

// const SubmissionHistory = ({ problemId }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSubmission, setSelectedSubmission] = useState(null);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         setLoading(true);

//         const response = await axiosClient.get(
//           `/problem/submittedProblem/${problemId}`,
//         );

//         // 🔥 SAFE DATA EXTRACTION (MAIN FIX)
//         const data =
//           response.data?.data ||
//           response.data?.submissions ||
//           response.data ||
//           [];

//         setSubmissions(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch submission history");
//         setSubmissions([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [problemId]);

//   // 🎨 Status badge color
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "accepted":
//         return "badge-success";
//       case "wrong":
//       case "failed":
//         return "badge-error";
//       case "error":
//         return "badge-warning";
//       case "pending":
//         return "badge-info";
//       default:
//         return "badge-neutral";
//     }
//   };

//   // 🧠 Memory format
//   const formatMemory = (memory) => {
//     if (!memory) return "-";
//     if (memory < 1024) return `${memory} kB`;
//     return `${(memory / 1024).toFixed(2)} MB`;
//   };

//   // 📅 Date format
//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     return new Date(dateString).toLocaleString();
//   };

//   // 🔄 Loading UI
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   // ❌ Error UI
//   if (error) {
//     return (
//       <div className="alert alert-error shadow-lg my-4">
//         <span>{error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <h2 className="text-xl font-bold mb-4">My Submissions</h2>

//       {/* Empty State */}
//       {submissions.length === 0 ? (
//         <div className="text-center text-gray-500 py-10">
//           No submissions yet 🚀
//         </div>
//       ) : (
//         <>
//           {/* Table */}
//           <div className="overflow-x-auto rounded-lg border border-base-300">
//             <table className="table table-zebra">
//               <thead className="bg-base-200">
//                 <tr>
//                   <th>#</th>
//                   <th>Language</th>
//                   <th>Status</th>
//                   <th>Runtime</th>
//                   <th>Memory</th>
//                   <th>Test Cases</th>
//                   <th>Submitted</th>
//                   <th></th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {submissions.map((sub, index) => (
//                   <tr key={sub._id || index}>
//                     <td>{index + 1}</td>

//                     <td className="font-mono">{sub.language || "-"}</td>

//                     <td>
//                       <span className={`badge ${getStatusColor(sub.status)}`}>
//                         {sub.status || "unknown"}
//                       </span>
//                     </td>

//                     <td className="font-mono">
//                       {sub.runtime ? `${sub.runtime}s` : "-"}
//                     </td>

//                     <td className="font-mono">{formatMemory(sub.memory)}</td>

//                     <td className="font-mono">
//                       {sub.testCasesPassed ?? 0}/{sub.testCasesTotal ?? 0}
//                     </td>

//                     <td>{formatDate(sub.createdAt)}</td>

//                     <td>
//                       <button
//                         className="btn btn-xs btn-outline"
//                         onClick={() => setSelectedSubmission(sub)}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Footer */}
//           <p className="text-sm text-gray-500 mt-3">
//             Total: {submissions.length} submissions
//           </p>
//         </>
//       )}

//       {/* 🧾 MODAL */}
//       {selectedSubmission && (
//         <div className="modal modal-open">
//           <div className="modal-box max-w-5xl">
//             <h3 className="font-bold text-lg mb-3">
//               {selectedSubmission.language} Submission
//             </h3>

//             {/* Info badges */}
//             <div className="flex flex-wrap gap-2 mb-4">
//               <span
//                 className={`badge ${getStatusColor(selectedSubmission.status)}`}
//               >
//                 {selectedSubmission.status}
//               </span>

//               <span className="badge badge-outline">
//                 Runtime:{" "}
//                 {selectedSubmission.runtime
//                   ? selectedSubmission.runtime + "s"
//                   : "-"}
//               </span>

//               <span className="badge badge-outline">
//                 Memory: {formatMemory(selectedSubmission.memory)}
//               </span>

//               <span className="badge badge-outline">
//                 Passed: {selectedSubmission.testCasesPassed ?? 0}/
//                 {selectedSubmission.testCasesTotal ?? 0}
//               </span>
//             </div>

//             {/* Error */}
//             {selectedSubmission.errorMessage && (
//               <div className="alert alert-error mb-3">
//                 {selectedSubmission.errorMessage}
//               </div>
//             )}

//             {/* Code */}
//             <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
//               <code>{selectedSubmission.code || "// No code available"}</code>
//             </pre>

//             {/* Close */}
//             <div className="modal-action">
//               <button
//                 className="btn"
//                 onClick={() => setSelectedSubmission(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubmissionHistory;

// ////////////////////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);

        const response = await axiosClient.get(
          `/problem/submittedProblem/${problemId}`,
        );

        const data =
          response.data?.data ||
          response.data?.submissions ||
          response.data ||
          [];

        setSubmissions(Array.isArray(data) ? data : []);
        setError(null);
      } catch {
        setError("Failed to fetch submission history");
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  // ⏱ Runtime
  const formatRuntime = (runtime) => {
    if (!runtime) return "-";
    if (runtime < 1) return `${(runtime * 1000).toFixed(0)} ms`;
    return `${runtime.toFixed(2)} s`;
  };

  // 🎨 Status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "badge-success";
      case "wrong":
      case "failed":
        return "badge-error";
      case "error":
        return "badge-warning";
      case "pending":
        return "badge-info";
      default:
        return "badge-neutral";
    }
  };

  const formatMemory = (memory) => {
    if (!memory) return "-";
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString();
  };

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-black">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]"></div>

      {/* ✨ GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[150px] rounded-full"></div>

      {/* CONTENT */}
      <div className="relative z-10 p-6">
        {/* HEADER */}

        {submissions.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No submissions yet
          </div>
        ) : (
          <>
            {/* TABLE */}
            <div
              className="overflow-x-auto rounded-2xl 
              bg-white/5 backdrop-blur-xl 
              border border-white/10 
              shadow-[0_0_40px_rgba(0,255,255,0.08)] 
              hover:shadow-[0_0_60px_rgba(0,255,255,0.15)] 
              transition-all duration-500"
            >
              <table className="table w-full border-separate border-spacing-y-3 text-white">
                {/* HEADER */}
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="px-4 py-3">#</th>
                    <th>Language</th>
                    <th>Status</th>
                    <th>Runtime</th>
                    <th>Memory</th>
                    <th>Test Cases</th>
                    <th>Submitted</th>
                    <th></th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {submissions.map((sub, index) => (
                    <tr
                      key={sub._id || index}
                      className="bg-white/5 border border-white/10 rounded-xl 
                      hover:bg-white/10 transition-all duration-300 
                      hover:scale-[1.02]"
                    >
                      <td className="px-4 py-4">{index + 1}</td>

                      <td className="font-mono text-cyan-300">
                        {sub.language || "-"}
                      </td>

                      <td>
                        <span className={`badge ${getStatusColor(sub.status)}`}>
                          {sub.status || "unknown"}
                        </span>
                      </td>

                      <td className="font-mono text-cyan-200">
                        {formatRuntime(sub.runtime)}
                      </td>

                      <td className="font-mono text-gray-300">
                        {formatMemory(sub.memory)}
                      </td>

                      <td className="font-mono text-gray-400">
                        {sub.testCasesPassed ?? 0}/{sub.testCasesTotal ?? 0}
                      </td>

                      <td className="text-sm text-gray-500">
                        {formatDate(sub.createdAt)}
                      </td>

                      <td>
                        <button
                          className="btn btn-sm btn-outline btn-info hover:scale-105 transition"
                          onClick={() => setSelectedSubmission(sub)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <p className="text-sm text-gray-400 mt-4">
              Total: {submissions.length} submissions
            </p>
          </>
        )}
      </div>

      {/* MODAL */}
      {selectedSubmission && (
        <div className="modal modal-open">
          <div className="modal-box max-w-5xl bg-[#020617] text-white border border-white/10">
            <h3 className="font-bold text-lg mb-3 text-cyan-400">
              {selectedSubmission.language} Submission
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`badge ${getStatusColor(selectedSubmission.status)}`}
              >
                {selectedSubmission.status}
              </span>

              <span className="badge badge-outline">
                Runtime: {formatRuntime(selectedSubmission.runtime)}
              </span>

              <span className="badge badge-outline">
                Memory: {formatMemory(selectedSubmission.memory)}
              </span>

              <span className="badge badge-outline">
                Passed: {selectedSubmission.testCasesPassed ?? 0}/
                {selectedSubmission.testCasesTotal ?? 0}
              </span>
            </div>

            {selectedSubmission.errorMessage && (
              <div className="alert alert-error mb-3">
                {selectedSubmission.errorMessage}
              </div>
            )}

            <pre className="bg-black text-green-400 p-4 rounded text-sm overflow-x-auto">
              <code>{selectedSubmission.code || "// No code available"}</code>
            </pre>

            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;

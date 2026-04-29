// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axiosClient from "../utils/axiosClient";
// import { useNavigate, useParams } from "react-router";
// import { useEffect, useState } from "react";

// // SAME schema
// const problemSchema = z.object({
//   title: z.string().min(1),
//   description: z.string().min(1),
//   difficulty: z.enum(["easy", "medium", "hard"]),
//   tags: z.enum(["array", "linkedList", "graph", "dp"]),
//   visibleTestCases: z.array(
//     z.object({
//       input: z.string().min(1),
//       output: z.string().min(1),
//       explanation: z.string().min(1),
//     }),
//   ),
//   hiddenTestCases: z.array(
//     z.object({
//       input: z.string().min(1),
//       output: z.string().min(1),
//     }),
//   ),
//   startCode: z
//     .array(
//       z.object({
//         language: z.enum(["C++", "Java", "JavaScript"]),
//         initialCode: z.string().min(1),
//       }),
//     )
//     .length(3),
//   referenceSolution: z
//     .array(
//       z.object({
//         language: z.enum(["C++", "Java", "JavaScript"]),
//         completeCode: z.string().min(1),
//       }),
//     )
//     .length(3),
// });

// function AdminUpdate() {
//   const { problemId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       startCode: [
//         { language: "C++", initialCode: "" },
//         { language: "Java", initialCode: "" },
//         { language: "JavaScript", initialCode: "" },
//       ],
//       referenceSolution: [
//         { language: "C++", completeCode: "" },
//         { language: "Java", completeCode: "" },
//         { language: "JavaScript", completeCode: "" },
//       ],
//     },
//   });

//   const {
//     fields: visibleFields,
//     append: appendVisible,
//     remove: removeVisible,
//   } = useFieldArray({ control, name: "visibleTestCases" });

//   const {
//     fields: hiddenFields,
//     append: appendHidden,
//     remove: removeHidden,
//   } = useFieldArray({ control, name: "hiddenTestCases" });

//   // 🔥 Prefill
//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         const { data } = await axiosClient.get(
//           `/problem/problemById/${problemId}`,
//         );

//         // console.log(data);

//         reset({
//           ...data,
//           visibleTestCases: data.visibleTestCases || [],
//           hiddenTestCases: data.hiddenTestCases || [],
//           startCode: data.startCode,
//           referenceSolution: data.referenceSolution,
//         });
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load problem");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProblem();
//   }, [problemId, reset]);

//   const onSubmit = async (data) => {
//     try {
//       setUpdating(true);
//       await axiosClient.put(`/problem/update/${problemId}`, data);
//       alert("Problem Updated Successfully");
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Update Problem</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* BASIC INFO */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

//           <input
//             {...register("title")}
//             className="input input-bordered w-full mb-3"
//           />

//           <textarea
//             {...register("description")}
//             className="textarea textarea-bordered w-full mb-3"
//           />

//           <div className="flex gap-4">
//             <select
//               {...register("difficulty")}
//               className="select select-bordered w-1/2"
//             >
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>

//             <select
//               {...register("tags")}
//               className="select select-bordered w-1/2"
//             >
//               <option value="array">Array</option>
//               <option value="linkedList">Linked List</option>
//               <option value="graph">Graph</option>
//               <option value="dp">DP</option>
//             </select>
//           </div>
//         </div>

//         {/* Visible Test Cases */}
//         <div className="card p-6 shadow">
//           <h2 className="text-lg font-semibold mb-2">Visible Test Cases</h2>

//           {visibleFields.map((field, index) => (
//             <div key={field.id} className="border p-3 mb-3">
//               <textarea
//                 {...register(`visibleTestCases.${index}.input`)}
//                 className="textarea w-full mb-2"
//               />
//               <input
//                 {...register(`visibleTestCases.${index}.output`)}
//                 className="input w-full mb-2"
//               />
//               <textarea
//                 {...register(`visibleTestCases.${index}.explanation`)}
//                 className="textarea w-full mb-2"
//               />

//               <button
//                 type="button"
//                 onClick={() => removeVisible(index)}
//                 className="btn btn-error btn-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() =>
//               appendVisible({ input: "", output: "", explanation: "" })
//             }
//             className="btn btn-primary btn-sm"
//           >
//             Add Case
//           </button>
//         </div>

//         {/* Hidden Test Cases */}
//         <div className="card p-6 shadow">
//           <h2 className="text-lg font-semibold mb-2">Hidden Test Cases</h2>

//           {hiddenFields.map((field, index) => (
//             <div key={field.id} className="border p-3 mb-3">
//               <textarea
//                 {...register(`hiddenTestCases.${index}.input`)}
//                 className="textarea w-full mb-2"
//               />
//               <input
//                 {...register(`hiddenTestCases.${index}.output`)}
//                 className="input w-full mb-2"
//               />

//               <button
//                 type="button"
//                 onClick={() => removeHidden(index)}
//                 className="btn btn-error btn-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() => appendHidden({ input: "", output: "" })}
//             className="btn btn-primary btn-sm"
//           >
//             Add Case
//           </button>
//         </div>

//         {/* Code Templates */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>

//           {[0, 1, 2].map((index) => (
//             <div key={index} className="mb-4">
//               <h3 className="font-medium">
//                 {index === 0 ? "C++" : index === 1 ? "Java" : "JavaScript"}
//               </h3>

//               {/* hidden language FIX */}
//               <input
//                 type="hidden"
//                 value={
//                   index === 0 ? "C++" : index === 1 ? "Java" : "JavaScript"
//                 }
//                 {...register(`startCode.${index}.language`)}
//               />
//               <input
//                 type="hidden"
//                 value={
//                   index === 0 ? "C++" : index === 1 ? "Java" : "JavaScript"
//                 }
//                 {...register(`referenceSolution.${index}.language`)}
//               />

//               <textarea
//                 {...register(`startCode.${index}.initialCode`)}
//                 className="textarea w-full mb-2"
//                 rows={4}
//               />

//               <textarea
//                 {...register(`referenceSolution.${index}.completeCode`)}
//                 className="textarea w-full"
//                 rows={4}
//               />
//             </div>
//           ))}
//         </div>

//         <button className="btn btn-success w-full">
//           {updating ? "Updating..." : "Update Problem"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminUpdate;

///////////////////////////////////////////////////////////////////////////////////

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

// Schema
const problemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.enum(["array", "linkedList", "graph", "dp"]),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
      explanation: z.string().min(1),
    }),
  ),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
    }),
  ),
  startCode: z.array(
    z.object({
      language: z.enum(["C++", "Java", "JavaScript"]),
      initialCode: z.string().min(1),
    }),
  ),
  referenceSolution: z.array(
    z.object({
      language: z.enum(["C++", "Java", "JavaScript"]),
      completeCode: z.string().min(1),
    }),
  ),
});

function AdminUpdate() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const { register, control, handleSubmit, reset } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: [
        { language: "C++", initialCode: "" },
        { language: "Java", initialCode: "" },
        { language: "JavaScript", initialCode: "" },
      ],
      referenceSolution: [
        { language: "C++", completeCode: "" },
        { language: "Java", completeCode: "" },
        { language: "JavaScript", completeCode: "" },
      ],
    },
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible,
  } = useFieldArray({ control, name: "visibleTestCases" });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({ control, name: "hiddenTestCases" });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await axiosClient.get(
          `/problem/problemById/${problemId}`,
        );

        reset({
          ...data,
          visibleTestCases: data.visibleTestCases || [],
          hiddenTestCases: data.hiddenTestCases || [],
        });
      } catch (err) {
        alert("Failed to load problem");
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId, reset]);

  const onSubmit = async (data) => {
    try {
      setUpdating(true);
      await axiosClient.put(`/problem/update/${problemId}`, data);
      alert("Updated Successfully 🚀");
      navigate("/");
    } catch (err) {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950/30 to-black"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4 shadow-lg shadow-green-500/20"></div>
          <p className="text-green-500/80 text-xl font-mono tracking-wider animate-pulse">
            LOADING DIMENSIONS...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative bg-black overflow-x-hidden perspective-container">
      {/* 🌌 3D DARK BACKGROUND WITH DEPTH */}
      <div className="fixed inset-0 z-0">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a1f0a] to-black"></div>

        {/* 3D Grid Floor Effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(60deg) scale(2)",
          }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(34,197,94,0.1)_40px,rgba(34,197,94,0.1)_42px),repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(34,197,94,0.1)_40px,rgba(34,197,94,0.1)_42px)]"></div>
        </div>

        {/* Floating orbs with 3D blur */}
        <div
          className="absolute w-96 h-96 bg-green-900/20 rounded-full blur-3xl animate-pulse top-20 left-10"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-emerald-800/20 rounded-full blur-3xl animate-pulse bottom-20 right-10"
          style={{ animationDuration: "12s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-green-700/15 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ animationDuration: "15s" }}
        ></div>

        {/* Star particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.2,
                animationDelay: Math.random() * 5 + "s",
                animationDuration: Math.random() * 3 + 2 + "s",
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto p-6 relative z-10">
        {/* 3D Title with depth */}
        <div className="text-center mb-12 transform-gpu perspective-500">
          <h1
            className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent inline-block animate-glow relative"
            style={{ textShadow: "0 0 30px rgba(34,197,94,0.3)" }}
          >
            🌿 UPDATE PROBLEM
          </h1>
          <div className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* BASIC INFO - 3D Card */}
          <div className="group card-3d">
            <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-green-500/20 shadow-2xl p-6 transition-all duration-500 hover:shadow-green-500/20 hover:border-green-500/40 transform-gpu hover:-translate-y-2 hover:rotateX-2 hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-700"></div>
              <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2 border-b border-green-500/30 pb-3">
                <span className="text-3xl">📋</span> Basic Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-green-300/80 text-sm font-mono mb-2">
                    TITLE
                  </label>
                  <input
                    {...register("title")}
                    placeholder="Enter problem title"
                    className="input-3d w-full"
                  />
                </div>

                <div>
                  <label className="block text-green-300/80 text-sm font-mono mb-2">
                    DESCRIPTION
                  </label>
                  <textarea
                    {...register("description")}
                    placeholder="Describe the problem in detail..."
                    rows={4}
                    className="textarea-3d w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-green-300/80 text-sm font-mono mb-2">
                      DIFFICULTY
                    </label>
                    <select
                      {...register("difficulty")}
                      className="select-3d w-full"
                    >
                      <option value="easy">🌱 Easy</option>
                      <option value="medium">⚡ Medium</option>
                      <option value="hard">🔥 Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-green-300/80 text-sm font-mono mb-2">
                      CATEGORY
                    </label>
                    <select {...register("tags")} className="select-3d w-full">
                      <option value="array">📊 Array</option>
                      <option value="linkedList">🔗 Linked List</option>
                      <option value="graph">🕸️ Graph</option>
                      <option value="dp">🧠 Dynamic Programming</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visible Test Cases - 3D Card */}
          <div className="group card-3d">
            <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-green-500/20 shadow-2xl p-6 transition-all duration-500 hover:shadow-green-500/20 hover:border-green-500/40 transform-gpu hover:-translate-y-2 hover:rotateX-2">
              <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2 border-b border-green-500/30 pb-3">
                <span className="text-3xl">👁️</span> Visible Test Cases
              </h2>

              <div className="space-y-6">
                {visibleFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative bg-green-950/20 rounded-xl p-5 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 group/test"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                      #{index + 1}
                    </div>
                    <div className="space-y-4">
                      <textarea
                        {...register(`visibleTestCases.${index}.input`)}
                        placeholder="Input data"
                        rows={2}
                        className="textarea-3d w-full"
                      />
                      <input
                        {...register(`visibleTestCases.${index}.output`)}
                        placeholder="Expected output"
                        className="input-3d w-full"
                      />
                      <textarea
                        {...register(`visibleTestCases.${index}.explanation`)}
                        placeholder="Explanation"
                        rows={2}
                        className="textarea-3d w-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeVisible(index)}
                        className="btn-remove"
                      >
                        ✕ Remove Case
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendVisible({ input: "", output: "", explanation: "" })
                  }
                  className="btn-add"
                >
                  + Add Visible Case
                </button>
              </div>
            </div>
          </div>

          {/* Hidden Test Cases - 3D Card */}
          <div className="group card-3d">
            <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-green-500/20 shadow-2xl p-6 transition-all duration-500 hover:shadow-green-500/20 hover:border-green-500/40 transform-gpu hover:-translate-y-2 hover:rotateX-2">
              <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2 border-b border-green-500/30 pb-3">
                <span className="text-3xl">🔒</span> Hidden Test Cases
              </h2>

              <div className="space-y-6">
                {hiddenFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative bg-purple-950/20 rounded-xl p-5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                      #{index + 1}
                    </div>
                    <div className="space-y-4">
                      <textarea
                        {...register(`hiddenTestCases.${index}.input`)}
                        placeholder="Hidden input data"
                        rows={2}
                        className="textarea-3d w-full"
                      />
                      <input
                        {...register(`hiddenTestCases.${index}.output`)}
                        placeholder="Expected output"
                        className="input-3d w-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeHidden(index)}
                        className="btn-remove"
                      >
                        ✕ Remove Hidden Case
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => appendHidden({ input: "", output: "" })}
                  className="btn-add"
                >
                  + Add Hidden Case
                </button>
              </div>
            </div>
          </div>

          {/* Code Templates - 3D Card with Languages */}
          <div className="group card-3d">
            <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-green-500/20 shadow-2xl p-6 transition-all duration-500 hover:shadow-green-500/20 hover:border-green-500/40 transform-gpu hover:-translate-y-2 hover:rotateX-2">
              <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2 border-b border-green-500/30 pb-3">
                <span className="text-3xl">💻</span> Code Templates
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { name: "C++", icon: "⚙️", color: "blue" },
                  { name: "Java", icon: "☕", color: "orange" },
                  { name: "JavaScript", icon: "🟡", color: "yellow" },
                ].map((lang, index) => (
                  <div key={index} className="space-y-4">
                    <div
                      className="flex items-center gap-2 text-xl font-bold"
                      style={{
                        color:
                          lang.color === "blue"
                            ? "#3b82f6"
                            : lang.color === "orange"
                              ? "#f97316"
                              : "#eab308",
                      }}
                    >
                      <span>{lang.icon}</span> {lang.name}
                    </div>

                    <input
                      type="hidden"
                      value={lang.name}
                      {...register(`startCode.${index}.language`)}
                    />
                    <input
                      type="hidden"
                      value={lang.name}
                      {...register(`referenceSolution.${index}.language`)}
                    />

                    <div>
                      <label className="block text-green-300/70 text-xs font-mono mb-1">
                        STARTER CODE
                      </label>
                      <textarea
                        {...register(`startCode.${index}.initialCode`)}
                        placeholder={`// ${lang.name} starter template`}
                        rows={6}
                        className="code-editor font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-green-300/70 text-xs font-mono mb-1">
                        SOLUTION
                      </label>
                      <textarea
                        {...register(`referenceSolution.${index}.completeCode`)}
                        placeholder={`// ${lang.name} complete solution`}
                        rows={6}
                        className="code-editor font-mono text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Submit Button */}
          <div className="relative perspective-500">
            <button
              type="submit"
              disabled={updating}
              className="btn-submit-3d group w-full"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-xl font-bold">
                {updating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    UPDATING...
                  </>
                ) : (
                  <>
                    🌿 UPDATE PROBLEM
                    <span className="text-2xl group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(34,197,94,0.3); }
          50% { text-shadow: 0 0 40px rgba(34,197,94,0.6); }
        }
        
        .animate-twinkle {
          animation: twinkle linear infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .perspective-container {
          perspective: 1200px;
        }
        
        .perspective-500 {
          perspective: 500px;
        }
        
        .card-3d {
          transform-style: preserve-3d;
        }
        
        .rotateX-2 {
          transform: rotateX(2deg);
        }
        
        .input-3d {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: white;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }
        
        .input-3d:focus {
          outline: none;
          border-color: rgba(34, 197, 94, 0.8);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
          transform: translateY(-2px);
        }
        
        .textarea-3d {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: white;
          transition: all 0.3s ease;
          resize: vertical;
        }
        
        .textarea-3d:focus {
          outline: none;
          border-color: rgba(34, 197, 94, 0.8);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
          transform: translateY(-2px);
        }
        
        .select-3d {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .select-3d:focus {
          outline: none;
          border-color: rgba(34, 197, 94, 0.8);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
        }
        
        .code-editor {
          background: #0a0f0a;
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #e0e0e0;
          font-family: 'Courier New', monospace;
          transition: all 0.3s ease;
          resize: vertical;
          width: 100%;
        }
        
        .code-editor:focus {
          outline: none;
          border-color: rgba(34, 197, 94, 0.8);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.15);
          transform: translateY(-1px);
        }
        
        .btn-add {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.1));
          border: 1px solid rgba(34, 197, 94, 0.4);
          color: #4ade80;
          padding: 0.6rem 1.5rem;
          border-radius: 2rem;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }
        
        .btn-add:hover {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.2));
          border-color: rgba(34, 197, 94, 0.7);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(34, 197, 94, 0.2);
        }
        
        .btn-remove {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(185, 28, 28, 0.1));
          border: 1px solid rgba(220, 38, 38, 0.4);
          color: #f87171;
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }
        
        .btn-remove:hover {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(185, 28, 28, 0.2));
          border-color: rgba(220, 38, 38, 0.7);
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(220, 38, 38, 0.2);
        }
        
        .btn-submit-3d {
          background: linear-gradient(135deg, #15803d, #166534);
          border: none;
          border-radius: 1rem;
          padding: 1rem 2rem;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          transform-style: preserve-3d;
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(34, 197, 94, 0.3) inset;
        }
        
        .btn-submit-3d::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
          border-radius: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .btn-submit-3d:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 30px -8px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(34, 197, 94, 0.5) inset;
        }
        
        .btn-submit-3d:hover::before {
          opacity: 1;
        }
        
        .btn-submit-3d:active {
          transform: translateY(2px);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0a1f0a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #15803d;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #166534;
        }
      `}</style>
    </div>
  );
}

export default AdminUpdate;

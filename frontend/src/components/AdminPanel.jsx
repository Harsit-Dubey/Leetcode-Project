// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axiosClient from "../utils/axiosClient";
// import { useNavigate } from "react-router";

// // Zod schema matching the problem schema
// const problemSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   description: z.string().min(1, "Description is required"),
//   difficulty: z.enum(["easy", "medium", "hard"]),
//   tags: z.enum(["array", "linkedList", "graph", "dp"]),
//   visibleTestCases: z
//     .array(
//       z.object({
//         input: z.string().min(1, "Input is required"),
//         output: z.string().min(1, "Output is required"),
//         explanation: z.string().min(1, "Explanation is required"),
//       }),
//     )
//     .min(1, "At least one visible test case required"),
//   hiddenTestCases: z
//     .array(
//       z.object({
//         input: z.string().min(1, "Input is required"),
//         output: z.string().min(1, "Output is required"),
//       }),
//     )
//     .min(1, "At least one hidden test case required"),
//   startCode: z
//     .array(
//       z.object({
//         language: z.enum(["C++", "Java", "JavaScript"]),
//         initialCode: z.string().min(1, "Initial code is required"),
//       }),
//     )
//     .length(3, "All three languages required"),
//   referenceSolution: z
//     .array(
//       z.object({
//         language: z.enum(["C++", "Java", "JavaScript"]),
//         completeCode: z.string().min(1, "Complete code is required"),
//       }),
//     )
//     .length(3, "All three languages required"),
// });

// function AdminPanel() {
//   const navigate = useNavigate();
//   const {
//     register,
//     control,
//     handleSubmit,
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
//   } = useFieldArray({
//     control,
//     name: "visibleTestCases",
//   });

//   const {
//     fields: hiddenFields,
//     append: appendHidden,
//     remove: removeHidden,
//   } = useFieldArray({
//     control,
//     name: "hiddenTestCases",
//   });

//   // 🔥 IMPORTANT FIX FUNCTION
//   const formatInput = (str) => {
//     return str
//       .replace(/\\n/g, "\n") // convert \n → actual newline
//       .replace(/\r\n/g, "\n") // windows fix
//       .trim();
//   };

//   const onSubmit = async (data) => {
//     try {
//       // ✅ FIX INPUT FORMAT
//       data.visibleTestCases = data.visibleTestCases.map((tc) => ({
//         ...tc,
//         input: formatInput(tc.input),
//       }));

//       data.hiddenTestCases = data.hiddenTestCases.map((tc) => ({
//         ...tc,
//         input: formatInput(tc.input),
//       }));

//       await axiosClient.post("/problem/create", data);
//       alert("Problem created successfully!");
//       navigate("/");
//     } catch (error) {
//       alert(`Error: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="space-y-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 {...register("title")}
//                 className={`input input-bordered ${errors.title && "input-error"}`}
//               />
//               {errors.title && (
//                 <span className="text-error">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 {...register("description")}
//                 className={`textarea textarea-bordered h-32 ${errors.description && "textarea-error"}`}
//               />
//               {errors.description && (
//                 <span className="text-error">{errors.description.message}</span>
//               )}
//             </div>

//             <div className="flex gap-4">
//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Difficulty</span>
//                 </label>
//                 <select
//                   {...register("difficulty")}
//                   className={`select select-bordered ${errors.difficulty && "select-error"}`}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </select>
//               </div>

//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Tag</span>
//                 </label>
//                 <select
//                   {...register("tags")}
//                   className={`select select-bordered ${errors.tags && "select-error"}`}
//                 >
//                   <option value="array">Array</option>
//                   <option value="linkedList">Linked List</option>
//                   <option value="graph">Graph</option>
//                   <option value="dp">DP</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Test Cases */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>

//           {/* Visible Test Cases */}
//           <div className="space-y-4 mb-6">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Visible Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() =>
//                   appendVisible({ input: "", output: "", explanation: "" })
//                 }
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Visible Case
//               </button>
//             </div>

//             {visibleFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeVisible(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <textarea
//                   {...register(`visibleTestCases.${index}.input`)}
//                   placeholder={`Example: 5
//                     1 2 3 4 5`}
//                   classname="textarea textarea-bordered w-full"
//                 />

//                 <input
//                   {...register(`visibleTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />

//                 <textarea
//                   {...register(`visibleTestCases.${index}.explanation`)}
//                   placeholder="Explanation"
//                   className="textarea textarea-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Hidden Test Cases */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Hidden Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendHidden({ input: "", output: "" })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Hidden Case
//               </button>
//             </div>

//             {hiddenFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeHidden(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>

//                 <textarea
//                   {...register(`hiddenTestCases.${index}.input`)}
//                   placeholder={`Example: 3
//                       10 20 30`}
//                   className="textarea textarea-bordered w-full"
//                 />

//                 <input
//                   {...register(`hiddenTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Code Templates */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>

//           <div className="space-y-6">
//             {[0, 1, 2].map((index) => (
//               <div key={index} className="space-y-2">
//                 <h3 className="font-medium">
//                   {index === 0 ? "C++" : index === 1 ? "Java" : "JavaScript"}
//                 </h3>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Initial Code</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`startCode.${index}.initialCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Reference Solution</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`referenceSolution.${index}.completeCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary w-full">
//           Create Problem
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminPanel;

////////////////////////////////////////////////////////////////////////
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router";

// Zod schema matching the problem schema
const problemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.enum(["array", "linkedList", "graph", "dp"]),
  visibleTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
        explanation: z.string().min(1, "Explanation is required"),
      }),
    )
    .min(1, "At least one visible test case required"),
  hiddenTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      }),
    )
    .min(1, "At least one hidden test case required"),
  startCode: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "JavaScript"]),
        initialCode: z.string().min(1, "Initial code is required"),
      }),
    )
    .length(3, "All three languages required"),
  referenceSolution: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "JavaScript"]),
        completeCode: z.string().min(1, "Complete code is required"),
      }),
    )
    .length(3, "All three languages required"),
});

function AdminPanel() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
  } = useFieldArray({
    control,
    name: "visibleTestCases",
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({
    control,
    name: "hiddenTestCases",
  });

  // 🔥 IMPORTANT FIX FUNCTION
  const formatInput = (str) => {
    return str
      .replace(/\\n/g, "\n") // convert \n → actual newline
      .replace(/\r\n/g, "\n") // windows fix
      .trim();
  };

  const onSubmit = async (data) => {
    try {
      // ✅ FIX INPUT FORMAT
      data.visibleTestCases = data.visibleTestCases.map((tc) => ({
        ...tc,
        input: formatInput(tc.input),
      }));

      data.hiddenTestCases = data.hiddenTestCases.map((tc) => ({
        ...tc,
        input: formatInput(tc.input),
      }));

      await axiosClient.post("/problem/create", data);
      alert("Problem created successfully!");
      navigate("/");
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  // High-quality cinematic river video (looping)
  const videoBg =
    "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4";

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-slate-100">
      {/* 🟢 Background Video Layer */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 z-0 h-full w-full object-cover animate-fade-in"
      >
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🟢 Immersive Gradient & Blur Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/50 to-black/80 backdrop-blur-[2px]"></div>

      {/* 🟢 Main Content Container */}
      <div className="relative z-20 container mx-auto p-6 md:p-12 animate-fade-in-up">
        {/* Cinematic Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white animate-fade-in-down">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500">
              Forge New Challenge
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto animate-fade-in delay-100">
            Craft immersive coding problems that push boundaries. Define inputs,
            solutions, and test cases with precision.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Section: Basic Information (Glassmorphism + 3D) */}
          <section className="glass-card shadow-3d group">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
              <div className="p-3 bg-cyan-500/20 rounded-full border border-cyan-500/30 text-cyan-300 shadow-inner-3d">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Basic Intelligence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="form-control col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text-custom">Challenge Title</span>
                </label>
                <input
                  {...register("title")}
                  className={`input-custom ${errors.title && "input-error-custom"}`}
                  placeholder="e.g., Dynamic Programming Masterclass"
                />
                {errors.title && (
                  <span className="text-red-400 text-sm mt-1 animate-pulse">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="form-control col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text-custom">
                    Description & Constraints
                  </span>
                </label>
                <textarea
                  {...register("description")}
                  className={`textarea-custom h-56 ${errors.description && "textarea-error-custom"}`}
                  placeholder="Describe the logic, examples, and computational constraints..."
                />
                {errors.description && (
                  <span className="text-red-400 text-sm mt-1 animate-pulse">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text-custom">Difficulty Level</span>
                </label>
                <select {...register("difficulty")} className="select-custom">
                  <option value="easy">Easy 🟢</option>
                  <option value="medium">Medium 🟡</option>
                  <option value="hard">Hard 🔴</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text-custom">Primary Tag</span>
                </label>
                <select {...register("tags")} className="select-custom">
                  <option value="array">Array</option>
                  <option value="linkedList">Linked List</option>
                  <option value="graph">Graph</option>
                  <option value="dp">DP</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section: Test Cases */}
          <section className="glass-card shadow-3d group">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
              <div className="p-3 bg-amber-500/20 rounded-full border border-amber-500/30 text-amber-300 shadow-inner-3d">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Validation Suite
              </h2>
            </div>

            {/* Visible Test Cases */}
            <div className="space-y-8 mb-12">
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 shadow-inner-3d">
                <h3 className="text-xl font-semibold text-cyan-300">
                  Public Test Cases
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    appendVisible({ input: "", output: "", explanation: "" })
                  }
                  className="btn-cyan-custom transform hover:-translate-y-1 transition-all duration-300"
                >
                  + Add Case
                </button>
              </div>

              {visibleFields.map((field, index) => (
                <div
                  key={field.id}
                  className="test-case-block group/case animate-scale-in"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                    <span className="text-sm font-medium text-slate-400">
                      Public Case #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeVisible(index)}
                      className="btn-error-custom opacity-0 group-hover/case:opacity-100"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      {...register(`visibleTestCases.${index}.input`)}
                      placeholder={`Input:\n5\n1 2 3 4 5`}
                      className="textarea-code h-32"
                    />
                    <input
                      {...register(`visibleTestCases.${index}.output`)}
                      placeholder="Output"
                      className="input-code h-12"
                    />
                  </div>
                  <textarea
                    {...register(`visibleTestCases.${index}.explanation`)}
                    placeholder="Step-by-step explanation..."
                    className="textarea-custom h-28 mt-4"
                  />
                </div>
              ))}
            </div>

            {/* Hidden Test Cases */}
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 shadow-inner-3d">
                <h3 className="text-xl font-semibold text-rose-300">
                  Hidden Evaluation Cases
                </h3>
                <button
                  type="button"
                  onClick={() => appendHidden({ input: "", output: "" })}
                  className="btn-rose-custom transform hover:-translate-y-1 transition-all duration-300"
                >
                  + Add Case
                </button>
              </div>

              {hiddenFields.map((field, index) => (
                <div
                  key={field.id}
                  className="test-case-block group/case animate-scale-in"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                    <span className="text-sm font-medium text-slate-400">
                      Hidden Case #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeHidden(index)}
                      className="btn-error-custom opacity-0 group-hover/case:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      {...register(`hiddenTestCases.${index}.input`)}
                      placeholder={`Input:\n1000\n...`}
                      className="textarea-code-hidden h-32"
                    />
                    <input
                      {...register(`hiddenTestCases.${index}.output`)}
                      placeholder="Output"
                      className="input-code-hidden h-12"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Code Templates & Solutions */}
          <section className="glass-card shadow-3d group">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
              <div className="p-3 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-300 shadow-inner-3d">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Code Engineering
              </h2>
            </div>

            <div className="space-y-12">
              {[0, 1, 2].map((index) => {
                const langName =
                  index === 0 ? "C++" : index === 1 ? "Java" : "JavaScript";
                const langColor =
                  index === 0
                    ? "text-blue-400"
                    : index === 1
                      ? "text-orange-400"
                      : "text-yellow-400";

                return (
                  <div
                    key={index}
                    className="space-y-6 p-6 border border-white/10 rounded-2xl bg-white/5 shadow-inner-3d animate-fade-in"
                  >
                    <h3 className={`font-extrabold text-2xl ${langColor}`}>
                      {langName}
                    </h3>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text-custom">
                          Initial Code Structure (For Users)
                        </span>
                      </label>
                      <div className="code-editor-container group/editor">
                        <div className="code-glow from-cyan-600 to-blue-600"></div>
                        <pre className="code-pre">
                          <textarea
                            {...register(`startCode.${index}.initialCode`)}
                            className="w-full bg-transparent font-mono text-sm text-green-400 placeholder-slate-700 focus:outline-none resize-none"
                            rows={10}
                            placeholder={`// Enter initial ${langName} boilerplate...\nclass Solution {\npublic:\n    vector<int> solve() {\n        \n    }\n};`}
                          />
                        </pre>
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text-custom">
                          Complete Reference Solution (For Validation)
                        </span>
                      </label>
                      <div className="code-editor-container group/editor">
                        <div className="code-glow from-yellow-600 to-amber-600"></div>
                        <pre className="code-pre">
                          <textarea
                            {...register(
                              `referenceSolution.${index}.completeCode`,
                            )}
                            className="w-full bg-transparent font-mono text-sm text-amber-300 placeholder-slate-700 focus:outline-none resize-none"
                            rows={12}
                            placeholder={`// Enter full optimized ${langName} solution...\n// (This code validates submissions)`}
                          />
                        </pre>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Cinematic Submit Button */}
          <div className="relative pt-10 pb-16 animate-fade-in-up delay-300">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-950 via-cyan-950 to-blue-950 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <button
              type="submit"
              className="relative btn-submit-custom shadow-2d-button"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
                🚀 Deploy Challenge
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* 🟢 Embedded CSS for custom styling, Glassmorphism, 3D, and Animations */}
      <style>{`
        /* --- Animations --- */
        @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes scale-in { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.5s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }

        /* --- Global Custom Classes --- */
        .glass-card {
          background-color: rgba(15, 23, 42, 0.7); /* slate-900 with alpha */
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2rem;
          padding: 2.5rem;
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        .glass-card:hover { transform: translateY(-4px); }
        .test-case-block {
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.5rem;
          border-radius: 1.5rem;
          background-color: rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        /* --- Form Labels & Inputs --- */
        .label-text-custom { font-size: 0.95rem; font-weight: 600; color: rgba(226, 232, 240, 0.8); }
        .input-custom, .textarea-custom, .select-custom {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-color: rgba(30, 41, 59, 0.6); /* slate-800 with alpha */
          color: white;
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          transition: all 0.2s ease;
        }
        .input-custom:focus, .textarea-custom:focus, .select-custom:focus {
          outline: none;
          border-color: rgba(34, 211, 238, 0.5); /* cyan-500 */
          box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.15);
        }
        .input-error-custom, .textarea-error-custom { border-color: rgba(244, 63, 94, 0.5); }
        .input-error-custom:focus, .textarea-error-custom:focus { border-color: rgba(244, 63, 94, 0.7); box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.15); }
        
        /* Code Inputs Specific */
        .textarea-code, .input-code, .textarea-code-hidden, .input-code-hidden {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.875rem;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background-color: rgba(15, 23, 42, 0.8); /* slate-900 */
          border-radius: 0.75rem;
          padding: 0.75rem;
        }
        .textarea-code, .input-code { color: rgba(167, 243, 208, 0.9); border-color: rgba(34, 211, 238, 0.3); }
        .textarea-code:focus, .input-code:focus { border-color: #22d3ee; }
        .textarea-code-hidden, .input-code-hidden { color: rgba(253, 226, 226, 0.9); border-color: rgba(244, 63, 94, 0.3); }
        .textarea-code-hidden:focus, .input-code-hidden:focus { border-color: #f43f5e; }

        /* --- Code Editors Container --- */
        .code-editor-container { position: relative; margin-top: 1rem; }
        .code-glow {
          position: absolute; -inset: 1px; border-radius: 1rem; blur: 8px; opacity: 0.1;
          background-image: linear-gradient(to right, var(--tw-gradient-stops));
          transition: opacity 0.5s ease;
        }
        .code-editor-container:hover .code-glow { opacity: 0.25; blur: 12px; }
        .code-pre {
          position: relative; background-color: rgba(0, 0, 0, 0.8);
          padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
          overflow: hidden;
        }

        /* --- Custom Buttons --- */
        .btn-cyan-custom {
          background-color: rgba(34, 211, 238, 0.1); border: 1px solid rgba(34, 211, 238, 0.3);
          color: #22d3ee; padding: 0.5rem 1rem; border-radius: 0.75rem; font-weight: 600; font-size: 0.875rem;
          transition: all 0.2s ease;
        }
        .btn-cyan-custom:hover { background-color: #22d3ee; color: #0f172a; border-color: #22d3ee; }
        
        .btn-rose-custom {
          background-color: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3);
          color: #f43f5e; padding: 0.5rem 1rem; border-radius: 0.75rem; font-weight: 600; font-size: 0.875rem;
          transition: all 0.2s ease;
        }
        .btn-rose-custom:hover { background-color: #f43f5e; color: #0f172a; border-color: #f43f5e; }

        .btn-error-custom {
          background-color: rgba(244, 63, 94, 0.05); border: 1px solid rgba(244, 63, 94, 0.2);
          color: #f43f5e; padding: 0.25rem 0.5rem; border-radius: 0.5rem; font-weight: 500; font-size: 0.75rem;
          transition: opacity 0.3s ease;
        }
        .btn-error-custom:hover { background-color: rgba(244, 63, 94, 0.8); color: white; border-color: transparent; }

        .btn-submit-custom {
          width: 100%; height: 4rem;
          background: linear-gradient(to right, #14b8a6, #22d3ee, #2563eb);
          border: none; border-radius: 1.5rem;
          font-size: 1.25rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
          color: white; transform: scale(1);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .btn-submit-custom:hover { transform: translateY(-4px) scale(1.02); }

        /* --- 3D Depth Effects (Shadows & Insets) --- */
        .shadow-3d { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255,255,255,0.05); }
        .shadow-inner-3d { box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(0, 0, 0, 0.2); }
        .shadow-3d-button { box-shadow: 0 10px 40px -10px rgba(34, 211, 238, 0.6); }
        .glass-card:hover.shadow-3d { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255,255,255,0.08); }
        
        /* Hide daisyUI default select arrow */
        select { appearance: none; -webkit-appearance: none; -moz-appearance: none; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>'); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.2rem; }
      `}</style>
    </div>
  );
}

export default AdminPanel;

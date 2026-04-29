// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import Editor from "@monaco-editor/react";
// import { useParams } from "react-router";
// import axiosClient from "../utils/axiosClient";
// import SubmissionHistory from "../components/SubmissionHistory";
// import ChatAi from "../components/ChatAi";
// import Editorial from "../components/Editorial";
// import { Bot, X } from "lucide-react";

// const langMap = {
//   cpp: "C++",
//   java: "Java",
//   javascript: "JavaScript",
// };

// const ProblemPage = () => {
//   const [problem, setProblem] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState("javascript");
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [runResult, setRunResult] = useState(null);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [activeLeftTab, setActiveLeftTab] = useState("description");
//   const [activeRightTab, setActiveRightTab] = useState("code");
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const editorRef = useRef(null);
//   let { problemId } = useParams();

//   const { handleSubmit } = useForm();

//   useEffect(() => {
//     const fetchProblem = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosClient.get(
//           `/problem/problemById/${problemId}`,
//         );

//         const initialCode = response.data.startCode.find(
//           (sc) => sc.language === langMap[selectedLanguage],
//         ).initialCode;

//         setProblem(response.data);

//         setCode(initialCode);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching problem:", error);
//         setLoading(false);
//       }
//     };

//     fetchProblem();
//   }, [problemId]);

//   // Update code when language changes
//   useEffect(() => {
//     if (problem) {
//       const initialCode = problem.startCode.find(
//         (sc) => sc.language === langMap[selectedLanguage],
//       ).initialCode;
//       setCode(initialCode);
//     }
//   }, [selectedLanguage, problem]);

//   const handleEditorChange = (value) => {
//     setCode(value || "");
//   };

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor;
//   };

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//   };

//   const handleRun = async () => {
//     setLoading(true);
//     setRunResult(null);

//     try {
//       const response = await axiosClient.post(`/submission/run/${problemId}`, {
//         code,
//         language: selectedLanguage,
//       });

//       setRunResult(response.data);
//       setLoading(false);
//       setActiveRightTab("testcase");
//     } catch (error) {
//       console.error("Error running code:", error);
//       setRunResult({
//         success: false,
//         error: "Internal server error",
//       });
//       setLoading(false);
//       setActiveRightTab("testcase");
//     }
//   };

//   const handleSubmitCode = async () => {
//     setLoading(true);
//     setSubmitResult(null);

//     try {
//       const response = await axiosClient.post(
//         `/submission/submit/${problemId}`,
//         {
//           code: code,
//           language: selectedLanguage,
//         },
//       );

//       setSubmitResult(response.data);
//       setLoading(false);
//       setActiveRightTab("result");
//     } catch (error) {
//       console.error("Error submitting code:", error);
//       setSubmitResult(null);
//       setLoading(false);
//       setActiveRightTab("result");
//     }
//   };

//   const getLanguageForMonaco = (lang) => {
//     switch (lang) {
//       case "javascript":
//         return "javascript";
//       case "java":
//         return "java";
//       case "cpp":
//         return "cpp";
//       default:
//         return "javascript";
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "easy":
//         return "text-green-500";
//       case "medium":
//         return "text-yellow-500";
//       case "hard":
//         return "text-red-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   if (loading && !problem) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex bg-base-100">
//       {/* Left Panel */}
//       <div className="w-1/2 flex flex-col border-r border-base-300">
//         {/* Left Tabs */}
//         <div className="tabs tabs-bordered bg-base-200 px-4">
//           <button
//             className={`tab ${activeLeftTab === "description" ? "tab-active" : ""}`}
//             onClick={() => setActiveLeftTab("description")}
//           >
//             Description
//           </button>
//           <button
//             className={`tab ${activeLeftTab === "editorial" ? "tab-active" : ""}`}
//             onClick={() => setActiveLeftTab("editorial")}
//           >
//             Editorial
//           </button>
//           <button
//             className={`tab ${activeLeftTab === "solutions" ? "tab-active" : ""}`}
//             onClick={() => setActiveLeftTab("solutions")}
//           >
//             Solutions
//           </button>
//           <button
//             className={`tab ${activeLeftTab === "submissions" ? "tab-active" : ""}`}
//             onClick={() => setActiveLeftTab("submissions")}
//           >
//             Submissions
//           </button>
//         </div>

//         {/* Left Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {problem && (
//             <>
//               {activeLeftTab === "description" && (
//                 <div>
//                   <div className="flex items-center gap-4 mb-6">
//                     <h1 className="text-2xl font-bold">{problem.title}</h1>
//                     <div
//                       className={`badge badge-outline ${getDifficultyColor(problem.difficulty)}`}
//                     >
//                       {problem.difficulty.charAt(0).toUpperCase() +
//                         problem.difficulty.slice(1)}
//                     </div>
//                     <div className="badge badge-primary">{problem.tags}</div>
//                   </div>

//                   <div className="prose max-w-none">
//                     <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                       {problem.description}
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <h3 className="text-lg font-semibold mb-4">Examples:</h3>
//                     <div className="space-y-4">
//                       {problem.visibleTestCases.map((example, index) => (
//                         <div key={index} className="bg-base-200 p-4 rounded-lg">
//                           <h4 className="font-semibold mb-2">
//                             Example {index + 1}:
//                           </h4>
//                           <div className="space-y-2 text-sm font-mono">
//                             <div>
//                               <strong>Input:</strong> {example.input}
//                             </div>
//                             <div>
//                               <strong>Output:</strong> {example.output}
//                             </div>
//                             <div>
//                               <strong>Explanation:</strong>{" "}
//                               {example.explanation}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === "editorial" && (
//                 <div className="prose max-w-none">
//                   <h2 className="text-xl font-bold mb-4">Editorial</h2>
//                   <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                     <Editorial
//                       secureUrl={problem.secureUrl}
//                       thumbnailUrl={problem.thumbnailUrl}
//                       duration={problem.duration}
//                     />
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === "solutions" && (
//                 <div>
//                   <h2 className="text-xl font-bold mb-4">Solutions</h2>
//                   <div className="space-y-6">
//                     {problem.referenceSolution?.map((solution, index) => (
//                       <div
//                         key={index}
//                         className="border border-base-300 rounded-lg"
//                       >
//                         <div className="bg-base-200 px-4 py-2 rounded-t-lg">
//                           <h3 className="font-semibold">
//                             {problem?.title} - {solution?.language}
//                           </h3>
//                         </div>
//                         <div className="p-4">
//                           <pre className="bg-base-300 p-4 rounded text-sm overflow-x-auto">
//                             <code>{solution?.completeCode}</code>
//                           </pre>
//                         </div>
//                       </div>
//                     )) || (
//                       <p className="text-gray-500">
//                         Solutions will be available after you solve the problem.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === "submissions" && (
//                 <div>
//                   <h2 className="text-xl font-bold mb-4">My Submissions</h2>
//                   <div className="text-gray-500">
//                     <SubmissionHistory problemId={problemId} />
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === "chatAI" && (
//                 <div className="prose max-w-none">
//                   <h2 className="text-xl font-bold mb-4">CHAT with AI</h2>
//                   <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                     <ChatAi problem={problem}></ChatAi>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-1/2 flex flex-col">
//         {/* Right Tabs */}
//         <div className="tabs tabs-bordered bg-base-200 px-4">
//           <button
//             className={`tab ${activeRightTab === "code" ? "tab-active" : ""}`}
//             onClick={() => setActiveRightTab("code")}
//           >
//             Code
//           </button>
//           <button
//             className={`tab ${activeRightTab === "testcase" ? "tab-active" : ""}`}
//             onClick={() => setActiveRightTab("testcase")}
//           >
//             Testcase
//           </button>
//           <button
//             className={`tab ${activeRightTab === "result" ? "tab-active" : ""}`}
//             onClick={() => setActiveRightTab("result")}
//           >
//             Result
//           </button>

//           {/* 🤖 FLOATING BUTTON */}
//           {!isChatOpen && (
//             <div
//               onClick={() => setIsChatOpen(true)}
//               className="fixed right-6 top-1 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg cursor-pointer z-50"
//             >
//               <Bot />
//             </div>
//           )}

//           {/* 💬 CHAT PANEL */}
//           {isChatOpen && (
//             <div className="fixed right-0 top-0 h-full w-full bg-base-100 border-l shadow-xl flex flex-col z-50">
//               <div className="flex justify-between p-4 border-b">
//                 <span>AI Chat</span>
//                 <button onClick={() => setIsChatOpen(false)}>
//                   <X />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-hidden">
//                 <ChatAi problem={problem} />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Content */}
//         <div className="flex-1 flex flex-col">
//           {activeRightTab === "code" && (
//             <div className="flex-1 flex flex-col">
//               {/* Language Selector */}
//               <div className="flex justify-between items-center p-4 border-b border-base-300">
//                 <div className="flex gap-2">
//                   {["javascript", "java", "cpp"].map((lang) => (
//                     <button
//                       key={lang}
//                       className={`btn btn-sm ${selectedLanguage === lang ? "btn-primary" : "btn-ghost"}`}
//                       onClick={() => handleLanguageChange(lang)}
//                     >
//                       {lang === "cpp"
//                         ? "C++"
//                         : lang === "javascript"
//                           ? "JavaScript"
//                           : "Java"}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Monaco Editor */}
//               <div className="flex-1">
//                 <Editor
//                   height="100%"
//                   language={getLanguageForMonaco(selectedLanguage)}
//                   value={code}
//                   onChange={handleEditorChange}
//                   onMount={handleEditorDidMount}
//                   theme="vs-dark"
//                   options={{
//                     fontSize: 14,
//                     minimap: { enabled: false },
//                     scrollBeyondLastLine: false,
//                     automaticLayout: true,
//                     tabSize: 2,
//                     insertSpaces: true,
//                     wordWrap: "on",
//                     lineNumbers: "on",
//                     glyphMargin: false,
//                     folding: true,
//                     lineDecorationsWidth: 10,
//                     lineNumbersMinChars: 3,
//                     renderLineHighlight: "line",
//                     selectOnLineNumbers: true,
//                     roundedSelection: false,
//                     readOnly: false,
//                     cursorStyle: "line",
//                     mouseWheelZoom: true,
//                   }}
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="p-4 border-t border-base-300 flex justify-between">
//                 <div className="flex gap-2">
//                   <button
//                     className="btn btn-ghost btn-sm"
//                     onClick={() => setActiveRightTab("testcase")}
//                   >
//                     Console
//                   </button>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     className={`btn btn-outline btn-sm ${loading ? "loading" : ""}`}
//                     onClick={handleRun}
//                     disabled={loading}
//                   >
//                     Run
//                   </button>
//                   <button
//                     className={`btn btn-primary btn-sm ${loading ? "loading" : ""}`}
//                     onClick={handleSubmitCode}
//                     disabled={loading}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeRightTab === "testcase" && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4">Test Results</h3>
//               {runResult ? (
//                 <div
//                   className={`alert ${runResult.success ? "alert-success" : "alert-error"} mb-4`}
//                 >
//                   <div>
//                     {runResult.success ? (
//                       <div>
//                         <h4 className="font-bold">✅ All test cases passed!</h4>
//                         <p className="text-sm mt-2">
//                           Runtime: {runResult.runtime + " sec"}
//                         </p>
//                         <p className="text-sm">
//                           Memory: {runResult.memory + " KB"}
//                         </p>

//                         <div className="mt-4 space-y-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div
//                               key={i}
//                               className="bg-base-100 p-3 rounded text-xs"
//                             >
//                               <div className="font-mono">
//                                 <div>
//                                   <strong>Input:</strong> {tc.stdin}
//                                 </div>
//                                 <div>
//                                   <strong>Expected:</strong>{" "}
//                                   {tc.expected_output}
//                                 </div>
//                                 <div>
//                                   <strong>Output:</strong> {tc.stdout}
//                                 </div>
//                                 <div className={"text-green-600"}>
//                                   {"✓ Passed"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <h4 className="font-bold">❌ Error</h4>
//                         <div className="mt-4 space-y-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div
//                               key={i}
//                               className="bg-base-100 p-3 rounded text-xs"
//                             >
//                               <div className="font-mono">
//                                 <div>
//                                   <strong>Input:</strong> {tc.stdin}
//                                 </div>
//                                 <div>
//                                   <strong>Expected:</strong>{" "}
//                                   {tc.expected_output}
//                                 </div>
//                                 <div>
//                                   <strong>Output:</strong> {tc.stdout}
//                                 </div>
//                                 <div
//                                   className={
//                                     tc.status_id == 3
//                                       ? "text-green-600"
//                                       : "text-red-600"
//                                   }
//                                 >
//                                   {tc.status_id == 3 ? "✓ Passed" : "✗ Failed"}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-gray-500">
//                   Click "Run" to test your code with the example test cases.
//                 </div>
//               )}
//             </div>
//           )}

//           {activeRightTab === "result" && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4">Submission Result</h3>
//               {submitResult ? (
//                 <div
//                   className={`alert ${submitResult.accepted ? "alert-success" : "alert-error"}`}
//                 >
//                   <div>
//                     {submitResult.accepted ? (
//                       <div>
//                         <h4 className="font-bold text-lg">🎉 Accepted</h4>
//                         <div className="mt-4 space-y-2">
//                           <p>
//                             Test Cases Passed: {submitResult.passedTestCases}/
//                             {submitResult.totalTestCases}
//                           </p>
//                           <p>Runtime: {submitResult.runtime + " sec"}</p>
//                           <p>Memory: {submitResult.memory + "KB"} </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <h4 className="font-bold text-lg">
//                           ❌ {submitResult.error}
//                         </h4>
//                         <div className="mt-4 space-y-2">
//                           <p>
//                             Test Cases Passed: {submitResult.passedTestCases}/
//                             {submitResult.totalTestCases}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-gray-500">
//                   Click "Submit" to submit your solution for evaluation.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemPage;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router";
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAi from "../components/ChatAi";
import Editorial from "../components/Editorial";
import {
  Bot,
  X,
  Play,
  Send,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  Code2,
  BookOpen,
  Lightbulb,
  History,
  Terminal,
  FileCode,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  ChevronLeft,
  Lock,
  GripVertical,
} from "lucide-react";

const langMap = {
  cpp: "C++",
  java: "Java",
  javascript: "JavaScript",
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState("description");
  const [activeRightTab, setActiveRightTab] = useState("code");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [leftPanelWidth, setLeftPanelWidth] = useState(45); // Percentage
  const [isResizing, setIsResizing] = useState(false);
  const editorRef = useRef(null);
  let { problemId } = useParams();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          `/problem/problemById/${problemId}`,
        );

        const initialCode = response.data.startCode.find(
          (sc) => sc.language === langMap[selectedLanguage],
        ).initialCode;

        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problem:", error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(
        (sc) => sc.language === langMap[selectedLanguage],
      ).initialCode;
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  // Handle resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const container = document.getElementById("main-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        const newWidth = ((e.clientX - rect.left) / rect.width) * 100;

        // Limit min and max width (20% to 80%)
        const clampedWidth = Math.min(Math.max(newWidth, 20), 80);
        setLeftPanelWidth(clampedWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    if (isResizing) {
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setRunLoading(true);
    setRunResult(null);

    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage,
      });

      setRunResult(response.data);
      setRunLoading(false);
      setActiveRightTab("testcase");
    } catch (error) {
      console.error("Error running code:", error);
      setRunResult({
        success: false,
        error: "Internal server error",
      });
      setRunLoading(false);
      setActiveRightTab("testcase");
    }
  };

  const handleSubmitCode = async () => {
    setSubmitLoading(true);
    setSubmitResult(null);

    try {
      const response = await axiosClient.post(
        `/submission/submit/${problemId}`,
        {
          code: code,
          language: selectedLanguage,
        },
      );

      setSubmitResult(response.data);
      setSubmitLoading(false);
      setActiveRightTab("result");
    } catch (error) {
      console.error("Error submitting code:", error);
      setSubmitResult(null);
      setSubmitLoading(false);
      setActiveRightTab("result");
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case "javascript":
        return "javascript";
      case "java":
        return "java";
      case "cpp":
        return "cpp";
      default:
        return "javascript";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "medium":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "hard":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getStatusIcon = (statusId) => {
    return statusId === 3 ? (
      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
    ) : (
      <XCircle className="w-4 h-4 text-rose-400" />
    );
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a]">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="main-container"
      className="h-screen flex bg-[#0a0a0a] text-gray-200"
    >
      {/* Left Panel */}
      <div
        className={`${isFullscreen ? "w-0 hidden" : ""} flex flex-col border-r border-[#2a2a2a] transition-all duration-300`}
        style={{ width: isFullscreen ? "0%" : `${leftPanelWidth}%` }}
      >
        {/* Left Header */}
        <div className="bg-[#0f0f0f] border-b border-[#2a2a2a]">
          <div className="flex items-center px-4 py-2">
            <div className="flex gap-1">
              <button
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeLeftTab === "description"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveLeftTab("description")}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Description
                </div>
                {activeLeftTab === "description" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
              <button
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeLeftTab === "editorial"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveLeftTab("editorial")}
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Editorial
                </div>
                {activeLeftTab === "editorial" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
              <button
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeLeftTab === "solutions"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveLeftTab("solutions")}
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Solutions
                </div>
                {activeLeftTab === "solutions" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
              <button
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeLeftTab === "submissions"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveLeftTab("submissions")}
              >
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Submissions
                </div>
                {activeLeftTab === "submissions" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Left Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-[#1a1a1a]">
          <div className="p-6">
            {problem && (
              <>
                {activeLeftTab === "description" && (
                  <div className="animate-fadeIn">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white mb-2">
                          {problem.title}
                        </h1>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                              problem.difficulty,
                            )}`}
                          >
                            {problem.difficulty.charAt(0).toUpperCase() +
                              problem.difficulty.slice(1)}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {problem.tags}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                        {problem.description
                          .split("\n")
                          .map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                        <FileCode className="w-4 h-4" />
                        Examples:
                      </h3>
                      <div className="space-y-4">
                        {problem.visibleTestCases.map((example, index) => (
                          <div
                            key={index}
                            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden"
                          >
                            <div className="bg-[#222] px-4 py-2 border-b border-[#2a2a2a]">
                              <h4 className="text-sm font-medium text-gray-300">
                                Example {index + 1}:
                              </h4>
                            </div>
                            <div className="p-4 space-y-3">
                              <div className="space-y-1">
                                <div className="text-xs font-medium text-gray-400">
                                  Input:
                                </div>
                                <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded p-3 font-mono text-sm">
                                  {example.input}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs font-medium text-gray-400">
                                  Output:
                                </div>
                                <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded p-3 font-mono text-sm">
                                  {example.output}
                                </div>
                              </div>
                              {example.explanation && (
                                <div className="space-y-1">
                                  <div className="text-xs font-medium text-gray-400">
                                    Explanation:
                                  </div>
                                  <div className="text-sm text-gray-300">
                                    {example.explanation}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {problem.constraints && (
                      <div className="mt-8">
                        <h3 className="text-base font-semibold text-white mb-3">
                          Constraints:
                        </h3>
                        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                          <ul className="space-y-2">
                            {problem.constraints.map((constraint, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm font-mono text-gray-300">
                                  {constraint}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeLeftTab === "editorial" && (
                  <div className="animate-fadeIn">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      Editorial
                    </h2>
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                      <Editorial
                        secureUrl={problem.secureUrl}
                        thumbnailUrl={problem.thumbnailUrl}
                        duration={problem.duration}
                      />
                    </div>
                  </div>
                )}

                {activeLeftTab === "solutions" && (
                  <div className="animate-fadeIn">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-blue-400" />
                      Solutions
                    </h2>
                    <div className="space-y-4">
                      {problem.referenceSolution?.map((solution, index) => (
                        <div
                          key={index}
                          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden"
                        >
                          <div className="bg-[#222] px-4 py-3 border-b border-[#2a2a2a]">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-white">
                                Approach {index + 1}: {solution?.language}
                              </h3>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    solution?.completeCode,
                                  );
                                }}
                                className="p-1.5 hover:bg-[#333] rounded transition-colors"
                              >
                                <Copy className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                          </div>
                          <div className="p-4">
                            <pre className="bg-[#0f0f0f] rounded-lg p-4 overflow-x-auto">
                              <code className="text-sm font-mono text-gray-300">
                                {solution?.completeCode}
                              </code>
                            </pre>
                          </div>
                        </div>
                      )) || (
                        <div className="text-center py-12">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a1a1a] rounded-full mb-4">
                            <Lock className="w-8 h-8 text-gray-500" />
                          </div>
                          <p className="text-gray-400">
                            Solutions will be available after you solve the
                            problem.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeLeftTab === "submissions" && (
                  <div className="animate-fadeIn">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <History className="w-5 h-5 text-purple-400" />
                      Submission History
                    </h2>
                    <SubmissionHistory problemId={problemId} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Resizable Divider */}
      {!isFullscreen && (
        <div
          className="w-1 bg-[#2a2a2a] hover:bg-blue-500 cursor-col-resize transition-colors duration-200 group relative flex items-center justify-center"
          onMouseDown={() => setIsResizing(true)}
        >
          <div className="absolute w-4 h-8 bg-[#1a1a1a] rounded-md border border-[#2a2a2a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-3 h-3 text-gray-400" />
          </div>
        </div>
      )}

      {/* Right Panel */}
      <div
        className={`${isFullscreen ? "w-full" : ""} flex flex-col transition-all duration-300`}
        style={{ width: isFullscreen ? "100%" : `${100 - leftPanelWidth}%` }}
      >
        {/* Right Header */}
        <div className="bg-[#0f0f0f] border-b border-[#2a2a2a]">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex gap-1">
              <button
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeRightTab === "code"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveRightTab("code")}
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Code
                </div>
                {activeRightTab === "code" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
              <button
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeRightTab === "testcase"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveRightTab("testcase")}
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Testcase
                </div>
                {activeRightTab === "testcase" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
              <button
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeRightTab === "result"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveRightTab("result")}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Result
                </div>
                {activeRightTab === "result" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-1.5 hover:bg-[#2a2a2a] rounded transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-gray-400" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeRightTab === "code" && (
            <div className="flex-1 flex flex-col">
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#0f0f0f] border-b border-[#2a2a2a]">
                <div className="flex items-center gap-1">
                  {["javascript", "java", "cpp"].map((lang) => (
                    <button
                      key={lang}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                        selectedLanguage === lang
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a]"
                      }`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang === "cpp"
                        ? "C++"
                        : lang === "javascript"
                          ? "JavaScript"
                          : "Java"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 hover:bg-[#1a1a1a] rounded transition-colors relative group"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-[#2a2a2a] text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {copied ? "Copied!" : "Copy code"}
                    </span>
                  </button>
                  <button
                    onClick={handleFormatCode}
                    className="p-1.5 hover:bg-[#1a1a1a] rounded transition-colors"
                    title="Format code"
                  >
                    <Code2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <div className="w-px h-4 bg-[#2a2a2a] mx-1"></div>
                  <button
                    onClick={() => setFontSize(Math.max(10, fontSize - 2))}
                    className="px-2 py-1 text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a] rounded"
                  >
                    A-
                  </button>
                  <span className="text-xs text-gray-400">{fontSize}px</span>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    className="px-2 py-1 text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a] rounded"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  options={{
                    fontSize: fontSize,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: "on",
                    lineNumbers: "on",
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: "line",
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: "line",
                    mouseWheelZoom: true,
                    padding: { top: 16, bottom: 16 },
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontLigatures: true,
                  }}
                  beforeMount={(monaco) => {
                    monaco.editor.defineTheme("customDark", {
                      base: "vs-dark",
                      inherit: true,
                      rules: [],
                      colors: {
                        "editor.background": "#0f0f0f",
                        "editor.lineHighlightBackground": "#1a1a1a",
                        "editorLineNumber.foreground": "#4a4a4a",
                        "editorLineNumber.activeForeground": "#6a6a6a",
                      },
                    });
                  }}
                  theme="customDark"
                />
              </div>

              {/* Action Buttons */}
              <div className="bg-[#0f0f0f] border-t border-[#2a2a2a] px-4 py-3">
                <div className="flex items-center justify-between">
                  <button
                    className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a] rounded transition-colors flex items-center gap-2"
                    onClick={() => setActiveRightTab("testcase")}
                  >
                    <Terminal className="w-4 h-4" />
                    Console
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        runLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] border border-[#4a4a4a]"
                      }`}
                      onClick={handleRun}
                      disabled={runLoading}
                    >
                      {runLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Run
                        </>
                      )}
                    </button>
                    <button
                      className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        submitLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                      }`}
                      onClick={handleSubmitCode}
                      disabled={submitLoading}
                    >
                      {submitLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRightTab === "testcase" && (
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-[#1a1a1a] p-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Test Results
                </h3>
                {runResult ? (
                  <div className="space-y-3">
                    <div
                      className={`rounded-lg border ${
                        runResult.success
                          ? "bg-emerald-500/5 border-emerald-500/20"
                          : "bg-rose-500/5 border-rose-500/20"
                      } p-4`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {runResult.success ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            <span className="font-medium text-emerald-400">
                              All test cases passed!
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-400" />
                            <span className="font-medium text-rose-400">
                              Test cases failed
                            </span>
                          </>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">Runtime:</span>
                          <span className="text-gray-200 font-mono">
                            {runResult.runtime} sec
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">Memory:</span>
                          <span className="text-gray-200 font-mono">
                            {runResult.memory} KB
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {runResult.testCases.map((tc, i) => (
                        <div
                          key={i}
                          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden"
                        >
                          <div className="bg-[#222] px-4 py-2 border-b border-[#2a2a2a] flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-300">
                              Test Case {i + 1}
                            </span>
                            {getStatusIcon(tc.status_id)}
                          </div>
                          <div className="p-4 space-y-2">
                            <div className="grid gap-2">
                              <div>
                                <div className="text-xs text-gray-500 mb-1">
                                  Input:
                                </div>
                                <div className="bg-[#0f0f0f] rounded p-2 font-mono text-sm">
                                  {tc.stdin}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-1">
                                  Expected Output:
                                </div>
                                <div className="bg-[#0f0f0f] rounded p-2 font-mono text-sm">
                                  {tc.expected_output}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500 mb-1">
                                  Your Output:
                                </div>
                                <div className="bg-[#0f0f0f] rounded p-2 font-mono text-sm">
                                  {tc.stdout}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                      <Play className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-center">
                      Click "Run" to test your code with the example test cases.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeRightTab === "result" && (
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-[#1a1a1a] p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Submission Result
              </h3>
              {submitResult ? (
                <div className="space-y-3">
                  <div
                    className={`rounded-lg border ${
                      submitResult.accepted
                        ? "bg-emerald-500/5 border-emerald-500/20"
                        : "bg-rose-500/5 border-rose-500/20"
                    } p-6`}
                  >
                    <div className="flex flex-col items-center text-center">
                      {submitResult.accepted ? (
                        <>
                          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                          </div>
                          <h4 className="text-xl font-bold text-emerald-400 mb-2">
                            Accepted
                          </h4>
                          <p className="text-gray-400 mb-4">
                            Congratulations! Your solution passed all test
                            cases.
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
                            <XCircle className="w-8 h-8 text-rose-400" />
                          </div>
                          <h4 className="text-xl font-bold text-rose-400 mb-2">
                            {submitResult.error || "Wrong Answer"}
                          </h4>
                          <p className="text-gray-400 mb-4">
                            Your solution didn't pass all test cases. Keep
                            trying!
                          </p>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#2a2a2a]">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {submitResult.passedTestCases}/
                          {submitResult.totalTestCases}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Test Cases Passed
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white font-mono">
                          {submitResult.runtime}s
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Runtime
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white font-mono">
                          {submitResult.memory}KB
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Memory</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-center">
                    Click "Submit" to submit your solution for evaluation.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* AI Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed right-12 top-2 w-9  h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-110 transition-all duration-300 z-40 group"
        >
          <Bot className="w-6 h-6 text-white" />
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#1a1a1a] text-sm text-gray-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#2a2a2a]">
            Ask AI Assistant
          </span>
        </button>
      )}

      {/* AI Chat Panel - Full Page */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col animate-fadeIn">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] bg-[#0f0f0f]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">AI Assistant</h2>
                  <p className="text-xs text-gray-400">Powered by AI</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden bg-[#0a0a0a]">
            <ChatAi problem={problem} />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #3a3a3a;
          border-radius: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #4a4a4a;
        }
      `}</style>
    </div>
  );
};

export default ProblemPage;

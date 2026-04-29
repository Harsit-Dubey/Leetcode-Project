// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../utils/axiosClient";
// import { Send } from "lucide-react";

// function ChatAi({ problem }) {
//   const [messages, setMessages] = useState([
//     { role: "model", parts: [{ text: "Hi, How are you" }] },
//     { role: "user", parts: [{ text: "I am Good" }] },
//   ]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const onSubmit = async (data) => {
//     setMessages((prev) => [
//       ...prev,
//       { role: "user", parts: [{ text: data.message }] },
//     ]);
//     reset();

//     try {
//       const response = await axiosClient.post("/ai/chat", {
//         messages: messages,
//         title: problem.title,
//         description: problem.description,
//         testCases: problem.visibleTestCases,
//         startCode: problem.startCode,
//       });

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "model",
//           parts: [{ text: response.data.message }],
//         },
//       ]);
//     } catch (error) {
//       console.error("API Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "model",
//           parts: [{ text: "Error from AI Chatbot" }],
//         },
//       ]);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
//           >
//             <div className="chat-bubble bg-base-200 text-base-content">
//               {msg.parts[0].text}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="sticky bottom-0 p-4 bg-base-100 border-t"
//       >
//         <div className="flex items-center">
//           <input
//             placeholder="Ask me anything"
//             className="input input-bordered flex-1"
//             {...register("message", { required: true, minLength: 2 })}
//           />
//           <button
//             type="submit"
//             className="btn btn-ghost ml-2"
//             disabled={errors.message}
//           >
//             <Send size={20} />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ChatAi;

///////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../utils/axiosClient";
// import { Send } from "lucide-react";

// function ChatAi({ problem }) {
//   const [messages, setMessages] = useState([
//     {
//       role: "model",
//       parts: [{ text: "Hi 👋, Ask me anything about this problem!" }],
//     },
//   ]);

//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const messagesEndRef = useRef(null);

//   // auto scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const onSubmit = async (data) => {
//     if (!data.message.trim()) return;

//     const newMessage = {
//       role: "user",
//       parts: [{ text: data.message }],
//     };

//     const updatedMessages = [...messages, newMessage];

//     // UI update
//     setMessages(updatedMessages);
//     reset();
//     setLoading(true);

//     try {
//       const response = await axiosClient.post("/ai/chat", {
//         messages: updatedMessages, // ✅ FIXED (latest state)
//         title: problem.title,
//         description: problem.description,
//         testCases: problem.visibleTestCases,
//         startCode: problem.startCode,
//       });

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "model",
//           parts: [{ text: response.data.message }],
//         },
//       ]);
//     } catch (error) {
//       console.error("API Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "model",
//           parts: [{ text: "❌ Error from AI Chatbot" }],
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
//       {/* CHAT AREA */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
//           >
//             <div className="chat-bubble bg-base-200 text-base-content whitespace-pre-wrap">
//               {msg.parts?.[0]?.text}
//             </div>
//           </div>
//         ))}

//         {/* Loading bubble */}
//         {loading && (
//           <div className="chat chat-start">
//             <div className="chat-bubble bg-base-200">Typing...</div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* INPUT AREA */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="sticky bottom-0 p-4 bg-base-100 border-t"
//       >
//         <div className="flex items-center gap-2">
//           <input
//             placeholder="Ask me anything..."
//             className="input input-bordered flex-1"
//             {...register("message", { required: true, minLength: 2 })}
//           />

//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={loading || errors.message}
//           >
//             <Send size={18} />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ChatAi;

/////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../utils/axiosClient";
// import { Send } from "lucide-react";

// export default function ChatAi({ problem }) {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const messagesEndRef = useRef(null);

//   // Load history from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("chat-history") || "[]");
//     setChatHistory(saved);

//     if (saved.length > 0) {
//       setActiveChat(saved[0].id);
//       setMessages(saved[0].messages);
//     } else {
//       const defaultMsg = [
//         {
//           role: "model",
//           parts: [{ text: "Hi 👋, Ask me anything about this problem!" }],
//         },
//       ];
//       setMessages(defaultMsg);
//     }
//   }, []);

//   // Auto scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Save history
//   const saveChat = (updatedMessages) => {
//     let updatedHistory = [...chatHistory];

//     if (!activeChat) {
//       const newChat = {
//         id: Date.now(),
//         title: updatedMessages[1]?.parts[0]?.text?.slice(0, 20) || "New Chat",
//         messages: updatedMessages,
//       };
//       updatedHistory.unshift(newChat);
//       setActiveChat(newChat.id);
//     } else {
//       updatedHistory = updatedHistory.map((chat) =>
//         chat.id === activeChat ? { ...chat, messages: updatedMessages } : chat,
//       );
//     }

//     setChatHistory(updatedHistory);
//     localStorage.setItem("chat-history", JSON.stringify(updatedHistory));
//   };

//   const onSubmit = async (data) => {
//     if (!data.message.trim()) return;

//     const newMessage = {
//       role: "user",
//       parts: [{ text: data.message }],
//     };

//     const updatedMessages = [...messages, newMessage];

//     setMessages(updatedMessages);
//     saveChat(updatedMessages);
//     reset();
//     setLoading(true);

//     try {
//       const response = await axiosClient.post("/ai/chat", {
//         messages: updatedMessages,
//         title: problem.title,
//         description: problem.description,
//         testCases: problem.visibleTestCases,
//         startCode: problem.startCode,
//       });

//       const finalMessages = [
//         ...updatedMessages,
//         {
//           role: "model",
//           parts: [{ text: response.data.message }],
//         },
//       ];

//       setMessages(finalMessages);
//       saveChat(finalMessages);
//     } catch (error) {
//       const finalMessages = [
//         ...updatedMessages,
//         {
//           role: "model",
//           parts: [{ text: "❌ Error from AI Chatbot" }],
//         },
//       ];

//       setMessages(finalMessages);
//       saveChat(finalMessages);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startNewChat = () => {
//     setActiveChat(null);
//     setMessages([
//       {
//         role: "model",
//         parts: [{ text: "Hi 👋, Ask me anything about this problem!" }],
//       },
//     ]);
//   };

//   const loadChat = (chat) => {
//     setActiveChat(chat.id);
//     setMessages(chat.messages);
//   };

//   return (
//     <div className="flex h-[85vh] bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-2xl overflow-hidden shadow-2xl">
//       {/* SIDEBAR */}
//       <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col">
//         <button
//           onClick={startNewChat}
//           className="m-3 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-105 transition"
//         >
//           + New Chat
//         </button>

//         <div className="flex-1 overflow-y-auto px-2 space-y-2">
//           {chatHistory.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => loadChat(chat)}
//               className={`p-3 rounded-lg cursor-pointer text-sm truncate hover:bg-white/10 ${
//                 activeChat === chat.id ? "bg-white/20" : ""
//               }`}
//             >
//               {chat.title}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MAIN CHAT */}
//       <div className="flex flex-col flex-1">
//         {/* HEADER */}
//         <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-lg font-semibold">
//           🤖 AI Assistant
//         </div>

//         {/* MESSAGES */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex gap-3 ${
//                 msg.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               {msg.role === "model" && (
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs">
//                   AI
//                 </div>
//               )}

//               <div
//                 className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm backdrop-blur-md border border-white/10 shadow-lg ${
//                   msg.role === "user"
//                     ? "bg-gradient-to-br from-blue-500 to-cyan-400"
//                     : "bg-white/10"
//                 }`}
//               >
//                 {msg.parts?.[0]?.text}
//               </div>

//               {msg.role === "user" && (
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs">
//                   U
//                 </div>
//               )}
//             </div>
//           ))}

//           {loading && (
//             <div className="flex gap-3">
//               <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs">
//                 AI
//               </div>
//               <div className="px-4 py-2 bg-white/10 rounded-xl animate-pulse">
//                 Typing...
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* INPUT */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-lg"
//         >
//           <div className="flex gap-3">
//             <input
//               placeholder="Send a message..."
//               className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none"
//               {...register("message", { required: true, minLength: 2 })}
//             />

//             <button
//               type="submit"
//               disabled={loading || errors.message}
//               className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-110 transition"
//             >
//               <Send size={18} />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send, Copy, Trash2 } from "lucide-react";

export default function ChatAi({ problem }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const [copiedIndex, setCopiedIndex] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deletedId, setDeletedId] = useState(null);

  const [tick, setTick] = useState(0); // 🔥 for live update

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const messagesEndRef = useRef(null);

  // 🔥 TIME FORMAT (MAIN FIX)
  const formatTime = (time) => {
    if (!time) return "";

    const now = new Date();
    const msgTime = new Date(time);

    const diff = (now - msgTime) / 1000;

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400)
      return msgTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    return msgTime.toLocaleDateString();
  };

  // 🔥 AUTO UPDATE TIME
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // LOAD HISTORY
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chat-history") || "[]");
    setChatHistory(saved);

    if (saved.length > 0) {
      setActiveChat(saved[0].id);
      setMessages(saved[0].messages);
    } else {
      setMessages([
        {
          role: "model",
          parts: [{ text: "Hi 👋, Ask me anything about this problem!" }],
          time: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SAVE CHAT
  const saveChat = (updatedMessages) => {
    let updatedHistory = [...chatHistory];

    if (!activeChat) {
      const newChat = {
        id: Date.now(),
        title: updatedMessages[1]?.parts[0]?.text?.slice(0, 20) || "New Chat",
        messages: updatedMessages,
      };
      updatedHistory.unshift(newChat);
      setActiveChat(newChat.id);
    } else {
      updatedHistory = updatedHistory.map((chat) =>
        chat.id === activeChat ? { ...chat, messages: updatedMessages } : chat,
      );
    }

    setChatHistory(updatedHistory);
    localStorage.setItem("chat-history", JSON.stringify(updatedHistory));
  };

  // SEND MESSAGE
  const onSubmit = async (data) => {
    if (!data.message.trim()) return;

    const newMessage = {
      role: "user",
      parts: [{ text: data.message }],
      time: new Date().toISOString(), // 🔥 FIX
    };

    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    saveChat(updatedMessages);
    reset();
    setLoading(true);

    try {
      const response = await axiosClient.post("/ai/chat", {
        messages: updatedMessages,
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode,
      });

      const finalMessages = [
        ...updatedMessages,
        {
          role: "model",
          parts: [{ text: response.data.message }],
          time: new Date().toISOString(), // 🔥 FIX
        },
      ];

      setMessages(finalMessages);
      saveChat(finalMessages);
    } catch {
      const finalMessages = [
        ...updatedMessages,
        {
          role: "model",
          parts: [{ text: "❌ Error from AI Chatbot" }],
          time: new Date().toISOString(),
        },
      ];

      setMessages(finalMessages);
      saveChat(finalMessages);
    } finally {
      setLoading(false);
    }
  };

  // COPY
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // DELETE CHAT
  const confirmDeleteChat = (id) => setDeleteConfirmId(id);
  const cancelDelete = () => setDeleteConfirmId(null);

  const deleteChat = (id) => {
    const updated = chatHistory.filter((chat) => chat.id !== id);
    setChatHistory(updated);
    localStorage.setItem("chat-history", JSON.stringify(updated));

    setDeleteConfirmId(null);
    setDeletedId(id);
    setTimeout(() => setDeletedId(null), 1500);

    if (activeChat === id) startNewChat();
  };

  const startNewChat = () => {
    setActiveChat(null);
    setMessages([
      {
        role: "model",
        parts: [{ text: "Hi 👋, Ask me anything about this problem!" }],
        time: new Date().toISOString(),
      },
    ]);
  };

  const loadChat = (chat) => {
    setActiveChat(chat.id);
    setMessages(chat.messages);
  };

  return (
    <div className="flex h-[85vh] bg-black text-white rounded-2xl overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-64 bg-black/40 border-r border-white/10 flex flex-col">
        <button
          onClick={startNewChat}
          className="m-3 p-3 rounded-xl bg-gray-800"
        >
          + New Chat
        </button>

        <div className="flex-1 overflow-y-auto px-2 space-y-2">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 rounded-lg text-sm ${
                activeChat === chat.id ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              <div className="flex justify-between items-center">
                <span
                  onClick={() => loadChat(chat)}
                  className="truncate cursor-pointer flex-1"
                >
                  {chat.title}
                </span>

                {deleteConfirmId === chat.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => deleteChat(chat.id)}
                      className="text-red-400 text-xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="text-gray-400 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : deletedId === chat.id ? (
                  <span className="text-green-400 text-xs">Deleted</span>
                ) : (
                  <button onClick={() => confirmDeleteChat(chat.id)}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-col flex-1">
        <div className="p-4 border-b border-white/10 font-semibold">
          ✳ AI Assistant
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[65%] px-4 py-3 rounded-2xl text-sm shadow-md ${
                  msg.role === "user"
                    ? "bg-gray-900 text-white"
                    : "bg-white/10 text-gray-100"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.parts?.[0]?.text}</p>

                <div className="flex justify-between mt-3 text-xs text-gray-400">
                  <span>{formatTime(msg.time)}</span>

                  <button
                    onClick={() => copyToClipboard(msg.parts[0].text, index)}
                  >
                    {copiedIndex === index ? "✅" : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex">
              <div className="bg-white/10 px-4 py-2 rounded-2xl animate-pulse">
                typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border-t border-white/10"
        >
          <div className="flex gap-3">
            <input
              className="flex-1 px-4 py-3 rounded-xl bg-black/40 border outline-none"
              placeholder="Send a message..."
              {...register("message", { required: true })}
            />

            <button
              type="submit"
              disabled={loading}
              className="p-3 bg-blue-500 rounded-xl"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

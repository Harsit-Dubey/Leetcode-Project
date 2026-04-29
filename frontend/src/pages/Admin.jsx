// import React from "react";
// import { Plus, Edit, Trash2, Video } from "lucide-react";
// import { NavLink } from "react-router";

// function Admin() {
//   // const [selectedOption, setSelectedOption] = useState(null);
//   const adminOptions = [
//     {
//       id: "create",
//       title: "Create Problem",
//       description: "Add a new coding problem to the platform",
//       icon: Plus,
//       color: "btn-success",
//       bgColor: "bg-success/10",
//       route: "/admin/create",
//     },
//     {
//       id: "update",
//       title: "Update Problem",
//       description: "Edit existing problems and their details",
//       icon: Edit,
//       color: "btn-warning",
//       bgColor: "bg-warning/10",
//       route: "/admin/update/:problemId",
//     },
//     {
//       id: "delete",
//       title: "Delete Problem",
//       description: "Remove problems from the platform",
//       icon: Trash2,
//       color: "btn-error",
//       bgColor: "bg-error/10",
//       route: "/admin/delete",
//     },
//     {
//       id: "video",
//       title: "Video Problem",
//       description: "Upload And Delete Videos",
//       icon: Video,
//       color: "btn-success",
//       bgColor: "bg-success/10",
//       route: "/admin/video",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className="container mx-auto px-4 py-8">
//         {/* header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-base-content mb-4">
//             Admin Panel
//           </h1>
//           <p className="text-base-content/70 text-lg">
//             Manage Coding Problems On Your Platform
//           </p>
//         </div>
//         {/* Admin Option Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {adminOptions.map((option) => {
//             const IconComponent = option.icon;
//             return (
//               <div
//                 key={option.id}
//                 className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
//               >
//                 <div className="card-body items-center text-center p-8">
//                   {/*icon  */}
//                   <div className={`${option.bgColor} p-4 rounded-full mb-4`}>
//                     <IconComponent size={32} className="text-base-content" />
//                   </div>
//                   {/* title */}
//                   <h2 className="card-title text-xl mb-2">{option.title}</h2>
//                   {/* Discription */}
//                   <p className="text-base-content/70 mb-6">
//                     {option.description}
//                   </p>
//                   {/* Action Button */}
//                   <div className="card-actions">
//                     <div className="card-actions">
//                       <NavLink
//                         to={option.route}
//                         className={`btn ${option.color} btn-wide`}
//                       >
//                         {option.title}
//                       </NavLink>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Admin;

////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Plus, Edit, Trash2, Video } from "lucide-react";
import { NavLink } from "react-router";

function Admin() {
  const adminOptions = [
    {
      id: "create",
      title: "Create Problem",
      description: "Add a new coding problem to the platform",
      icon: Plus,
      route: "/admin/create",
      glow: "shadow-green-500/30",
    },
    {
      id: "update",
      title: "Update Problem",
      description: "Edit existing problems and their details",
      icon: Edit,
      route: "/admin/update/:problemId", // ✅ untouched
      glow: "shadow-yellow-500/30",
    },
    {
      id: "delete",
      title: "Delete Problem",
      description: "Remove problems from the platform",
      icon: Trash2,
      route: "/admin/delete",
      glow: "shadow-red-500/30",
    },
    {
      id: "video",
      title: "Video Problem",
      description: "Upload And Delete Videos",
      icon: Video,
      route: "/admin/video",
      glow: "shadow-blue-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-[#05070d] text-white relative overflow-hidden">
      {/* 🔥 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 container mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
            ⚙️ Admin Panel
          </h1>
          <p className="text-gray-400 mt-3">
            Manage Coding Problems Efficiently
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto perspective-[1200px]">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;

            return (
              <div key={option.id} className="group">
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 transition-all duration-500">
                  {/* Card */}
                  <div
                    className={`
                      rounded-2xl p-8 text-center
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      transform transition-all duration-500
                      hover:scale-105
                      hover:rotate-x-6 hover:-rotate-y-6
                      ${option.glow}
                      hover:shadow-2xl
                    `}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                        <IconComponent size={32} />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition">
                      {option.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-6">
                      {option.description}
                    </p>

                    {/* Button (UNCHANGED LOGIC) */}
                    <NavLink
                      to={option.route}
                      className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
                    >
                      {option.title}
                    </NavLink>

                    {/* Glow line */}
                    <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500 mx-auto" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, NavLink } from "react-router";
// import { registerUser } from "../authSlice";

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Minimum character should be 3"),
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(8, "Password is too weak"),
// });

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useSelector((state) => state.auth); // Removed error as it wasn't used

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(signupSchema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
//       {" "}
//       {/* Added a light bg for contrast */}
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center text-3xl mb-6">AlgoWar+</h2>{" "}
//           {/* Added mb-6 for spacing */}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* First Name Field */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">First Name</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="John"
//                 className={`input input-bordered w-full ${errors.firstName ? "input-error" : ""}`}
//                 {...register("firstName")}
//               />
//               {errors.firstName && (
//                 <span className="text-error text-sm mt-1">
//                   {errors.firstName.message}
//                 </span>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 className={`input input-bordered w-full ${errors.emailId ? "input-error" : ""}`} // Ensure w-full for consistency
//                 {...register("emailId")}
//               />
//               {errors.emailId && (
//                 <span className="text-error text-sm mt-1">
//                   {errors.emailId.message}
//                 </span>
//               )}
//             </div>

//             {/* Password Field with Toggle */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   // Added pr-10 (padding-right) to make space for the button
//                   className={`input input-bordered w-full pr-10 ${errors.password ? "input-error" : ""}`}
//                   {...register("password")}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
//                 >
//                   {showPassword ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <span className="text-error text-sm mt-1">
//                   {errors.password.message}
//                 </span>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="form-control mt-8 flex justify-center">
//               <button
//                 type="submit"
//                 className={`btn btn-primary ${loading ? "loading" : ""}`}
//                 disabled={loading}
//               >
//                 {loading ? "Signing Up..." : "Sign Up"}
//               </button>
//             </div>
//           </form>
//           {/* Login Redirect */}
//           <div className="text-center mt-6">
//             {" "}
//             {/* Increased mt for spacing */}
//             <span className="text-sm">
//               Already have an account?{" "}
//               <NavLink to="/login" className="link link-primary">
//                 Login
//               </NavLink>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

//////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router";
import { registerUser } from "../authSlice";
import bgImage from "../assets/bg.png";
import { Eye, EyeOff } from "lucide-react";

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak"),
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(https://content.app-sources.com/s/84388386817481548/uploads/Downloaded/DALLE_2024-03-30_09.35.22_-_Envisioning_the_AI_future_by_SinteX_AI__A_futuristic_cityscape_where_AI_and_humans_collaborate_seamlessly._The_city_is_fil-1787146.webp)`,
      }}
    >
      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20 "></div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10">
        {/* 🔥 CARD BORDER GLOW */}
        <div className="w-96 p-[1.5px] rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_30px_rgba(0,255,255,0.25)]">
          {/* 🔥 CARD */}
          <div className="bg-[#020617]/90 backdrop-blur-2xl rounded-2xl p-8 border border-white/10">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
              AlgoWar+
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="text-gray-400 text-sm">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className={`w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10 transition duration-300 ${
                    errors.firstName && "border-red-500"
                  }`}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition duration-300 ${
                    errors.emailId && "border-red-500"
                  }`}
                  {...register("emailId")}
                />
                {errors.emailId && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.emailId.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="text-gray-400 text-sm">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full mt-1 px-4 py-2 pr-10 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/10 transition duration-300 ${
                    errors.password && "border-red-500"
                  }`}
                  {...register("password")}
                />

                {/* 🔥 ICON TOGGLE */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 text-gray-400 hover:text-cyan-400 hover:scale-110 transition duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-semibold hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            {/* 🔥 OR Divider */}
            <div className="flex items-center gap-3 my-6">
              <hr className="flex-grow border-t border-white/10" />
              <span className="text-gray-500 text-xs tracking-widest">OR</span>
              <hr className="flex-grow border-t border-white/10" />
            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm mt-4">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

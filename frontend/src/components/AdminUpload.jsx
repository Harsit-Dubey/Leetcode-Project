// import { useParams } from "react-router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import axiosClient from "../utils/axiosClient";

// function AdminUpload() {
//   const { problemId } = useParams();

//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadedVideo, setUploadedVideo] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//     setError,
//     clearErrors,
//   } = useForm();

//   const selectedFile = watch("videoFile")?.[0];

//   // Upload video to Cloudinary
//   const onSubmit = async (data) => {
//     const file = data.videoFile[0];

//     setUploading(true);
//     setUploadProgress(0);
//     clearErrors();

//     try {
//       // Step 1: Get upload signature from backend
//       const signatureResponse = await axiosClient.get(
//         `/video/create/${problemId}`,
//       );
//       const {
//         signature,
//         timestamp,
//         public_id,
//         api_key,
//         cloud_name,
//         upload_url,
//       } = signatureResponse.data;

//       // Step 2: Create FormData for Cloudinary upload
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("signature", signature);
//       formData.append("timestamp", timestamp);
//       formData.append("public_id", public_id);
//       formData.append("api_key", api_key);

//       // Step 3: Upload directly to Cloudinary
//       const uploadResponse = await axios.post(upload_url, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total,
//           );
//           setUploadProgress(progress);
//         },
//       });
//       const cloudinaryResult = uploadResponse.data;

//       // Step 4: Save video metadata to backend
//       const metadataResponse = await axiosClient.post("/video/save", {
//         problemId: problemId,
//         cloudinaryPublicId: cloudinaryResult.public_id,
//         secureUrl: cloudinaryResult.secure_url,
//         duration: cloudinaryResult.duration,
//       });

//       setUploadedVideo(metadataResponse.data.videoSolution);
//       reset(); // Reset form after successful upload
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError("root", {
//         type: "manual",
//         message:
//           err.response?.data?.message || "Upload failed. Please try again.",
//       });
//     } finally {
//       setUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   // Format file size
//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   // Format duration
//   const formatDuration = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title">Upload Video</h2>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* File Input */}
//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text">Choose video file</span>
//               </label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 {...register("videoFile", {
//                   required: "Please select a video file",
//                   validate: {
//                     isVideo: (files) => {
//                       if (!files || !files[0])
//                         return "Please select a video file";
//                       const file = files[0];
//                       return (
//                         file.type.startsWith("video/") ||
//                         "Please select a valid video file"
//                       );
//                     },
//                     fileSize: (files) => {
//                       if (!files || !files[0]) return true;
//                       const file = files[0];
//                       const maxSize = 100 * 1024 * 1024; // 100MB
//                       return (
//                         file.size <= maxSize ||
//                         "File size must be less than 100MB"
//                       );
//                     },
//                   },
//                 })}
//                 className={`file-input file-input-bordered w-full ${errors.videoFile ? "file-input-error" : ""}`}
//                 disabled={uploading}
//               />
//               {errors.videoFile && (
//                 <label className="label">
//                   <span className="label-text-alt text-error">
//                     {errors.videoFile.message}
//                   </span>
//                 </label>
//               )}
//             </div>

//             {/* Selected File Info */}
//             {selectedFile && (
//               <div className="alert alert-info">
//                 <div>
//                   <h3 className="font-bold">Selected File:</h3>
//                   <p className="text-sm">{selectedFile.name}</p>
//                   <p className="text-sm">
//                     Size: {formatFileSize(selectedFile.size)}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Upload Progress */}
//             {uploading && (
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span>Uploading...</span>
//                   <span>{uploadProgress}%</span>
//                 </div>
//                 <progress
//                   className="progress progress-primary w-full"
//                   value={uploadProgress}
//                   max="100"
//                 ></progress>
//               </div>
//             )}

//             {/* Error Message */}
//             {errors.root && (
//               <div className="alert alert-error">
//                 <span>{errors.root.message}</span>
//               </div>
//             )}

//             {/* Success Message */}
//             {uploadedVideo && (
//               <div className="alert alert-success">
//                 <div>
//                   <h3 className="font-bold">Upload Successful!</h3>
//                   <p className="text-sm">
//                     Duration: {formatDuration(uploadedVideo.duration)}
//                   </p>
//                   <p className="text-sm">
//                     Uploaded:
//                     {new Date(uploadedVideo.uploadedAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Upload Button */}
//             <div className="card-actions justify-end">
//               <button
//                 type="submit"
//                 disabled={uploading}
//                 className={`btn btn-primary ${uploading ? "loading" : ""}`}
//               >
//                 {uploading ? "Uploading..." : "Upload Video"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminUpload;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useParams } from "react-router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import axiosClient from "../utils/axiosClient";
// import { UploadCloud, CheckCircle, AlertCircle } from "lucide-react";

// function AdminUpload() {
//   const { problemId } = useParams();

//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadedVideo, setUploadedVideo] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//     setError,
//     clearErrors,
//   } = useForm();

//   const selectedFile = watch("videoFile")?.[0];

//   const onSubmit = async (data) => {
//     const file = data.videoFile[0];

//     setUploading(true);
//     setUploadProgress(0);
//     clearErrors();

//     try {
//       const signatureResponse = await axiosClient.get(
//         `/video/create/${problemId}`,
//       );

//       const { signature, timestamp, public_id, api_key, upload_url } =
//         signatureResponse.data;

//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("signature", signature);
//       formData.append("timestamp", timestamp);
//       formData.append("public_id", public_id);
//       formData.append("api_key", api_key);

//       const uploadResponse = await axios.post(upload_url, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total,
//           );
//           setUploadProgress(progress);
//         },
//       });

//       const cloudinaryResult = uploadResponse.data;

//       const metadataResponse = await axiosClient.post("/video/save", {
//         problemId,
//         cloudinaryPublicId: cloudinaryResult.public_id,
//         secureUrl: cloudinaryResult.secure_url,
//         duration: cloudinaryResult.duration,
//       });

//       setUploadedVideo(metadataResponse.data.videoSolution);
//       reset();
//     } catch (err) {
//       setError("root", {
//         type: "manual",
//         message: err.response?.data?.message || "Upload failed. Try again.",
//       });
//     } finally {
//       setUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   const formatDuration = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-slate-800">
//       <div className="w-full max-w-lg bg-base-100 rounded-3xl shadow-2xl p-6">
//         <h2 className="text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
//           🚀 Upload Solution Video
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* File Input */}
//           <div>
//             <label className="font-semibold mb-1 block">Select Video</label>
//             <input
//               type="file"
//               accept="video/*"
//               {...register("videoFile", {
//                 required: "Select a video file",
//               })}
//               className={`file-input file-input-bordered w-full ${
//                 errors.videoFile ? "file-input-error" : ""
//               }`}
//               disabled={uploading}
//             />
//             {errors.videoFile && (
//               <p className="text-error text-sm mt-1">
//                 {errors.videoFile.message}
//               </p>
//             )}
//           </div>

//           {/* Preview Card */}
//           {selectedFile && (
//             <div className="p-3 rounded-xl bg-base-200">
//               <p className="font-semibold">📁 {selectedFile.name}</p>
//               <p className="text-sm opacity-70">
//                 {formatFileSize(selectedFile.size)}
//               </p>
//             </div>
//           )}

//           {/* Progress */}
//           {uploading && (
//             <div>
//               <div className="flex justify-between text-sm mb-1">
//                 <span>Uploading...</span>
//                 <span>{uploadProgress}%</span>
//               </div>
//               <progress
//                 className="progress progress-primary w-full"
//                 value={uploadProgress}
//                 max="100"
//               />
//             </div>
//           )}

//           {/* Error */}
//           {errors.root && (
//             <div className="alert alert-error flex items-center gap-2">
//               <AlertCircle size={18} />
//               <span>{errors.root.message}</span>
//             </div>
//           )}

//           {/* Success */}
//           {uploadedVideo && (
//             <div className="alert alert-success flex items-center gap-2">
//               <CheckCircle size={18} />
//               <div>
//                 <p className="font-semibold">Upload Successful</p>
//                 <p className="text-sm">
//                   Duration: {formatDuration(uploadedVideo.duration)}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Upload Button */}
//           <button
//             type="submit"
//             disabled={uploading}
//             className={`btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none ${
//               uploading ? "loading" : ""
//             }`}
//           >
//             {uploading ? "Uploading..." : "Upload Video"}
//             {!uploading && <UploadCloud size={18} />}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminUpload;

///////////////////////////////////////////////////////////////////////////

import { useParams } from "react-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosClient from "../utils/axiosClient";
import {
  UploadCloud,
  CheckCircle,
  AlertCircle,
  FileVideo,
  X,
} from "lucide-react";

function AdminUpload() {
  const { problemId } = useParams();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();

  const selectedFile = watch("videoFile")?.[0];

  const onSubmit = async (data) => {
    const file = data.videoFile[0];

    setUploading(true);
    setUploadProgress(0);
    clearErrors();

    try {
      const signatureResponse = await axiosClient.get(
        `/video/create/${problemId}`,
      );

      const { signature, timestamp, public_id, api_key, upload_url } =
        signatureResponse.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("public_id", public_id);
      formData.append("api_key", api_key);

      const uploadResponse = await axios.post(upload_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(progress);
        },
      });

      const cloudinaryResult = uploadResponse.data;

      const metadataResponse = await axiosClient.post("/video/save", {
        problemId,
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });

      setUploadedVideo(metadataResponse.data.videoSolution);
      reset();
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Upload failed. Try again.",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header Card */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4 transform transition-transform hover:scale-105">
            <UploadCloud className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
            Upload Solution
          </h2>
          <p className="text-gray-400 mt-2">Problem ID: #{problemId}</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Select Video File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  id="videoFile"
                  {...register("videoFile", {
                    required: "Please select a video file",
                  })}
                  className="hidden"
                  disabled={uploading}
                />
                <label
                  htmlFor="videoFile"
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                    errors.videoFile
                      ? "border-red-500 bg-red-500/10"
                      : "border-gray-500 bg-gray-800/50 hover:border-purple-500 hover:bg-purple-500/10"
                  } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <UploadCloud
                    className={`w-12 h-12 mb-3 ${
                      errors.videoFile ? "text-red-400" : "text-gray-400"
                    }`}
                  />
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold text-purple-400">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    MP4, MOV, AVI, or WebM (Max 500MB)
                  </p>
                </label>
              </div>
              {errors.videoFile && (
                <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.videoFile.message}</span>
                </div>
              )}
            </div>

            {/* File Preview */}
            {selectedFile && (
              <div className="group relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    clearErrors();
                  }}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <FileVideo className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-200 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">Ready to upload</div>
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Uploading to Cloudinary...</span>
                  <span className="font-mono">{uploadProgress}%</span>
                </div>
                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-shimmer"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Please don't close this window
                </p>
              </div>
            )}

            {/* Error Message */}
            {errors.root && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-red-400">Upload Failed</p>
                  <p className="text-sm text-red-300">{errors.root.message}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {uploadedVideo && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3 animate-in slide-in-from-top-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-400">
                    Upload Successful!
                  </p>
                  <p className="text-sm text-green-300">
                    Duration: {formatDuration(uploadedVideo.duration)}
                  </p>
                  <p className="text-xs text-green-400/70 mt-1">
                    Video has been saved successfully
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className={`relative w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                uploading || !selectedFile
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-xl"
              }`}
            >
              {uploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <UploadCloud className="w-5 h-5" />
                  <span>Upload Video</span>
                </div>
              )}
            </button>

            {/* Info Note */}
            {!selectedFile && !uploading && !uploadedVideo && (
              <div className="text-center text-xs text-gray-500 pt-4">
                Supported formats: MP4, MOV, AVI, WebM
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default AdminUpload;

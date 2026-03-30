import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

// SAME schema
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
  startCode: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "JavaScript"]),
        initialCode: z.string().min(1),
      }),
    )
    .length(3),
  referenceSolution: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "JavaScript"]),
        completeCode: z.string().min(1),
      }),
    )
    .length(3),
});

function AdminUpdate() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
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
  } = useFieldArray({ control, name: "visibleTestCases" });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({ control, name: "hiddenTestCases" });

  // 🔥 Prefill
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await axiosClient.get(
          `/problem/problemById/${problemId}`,
        );

        // console.log(data);

        reset({
          ...data,
          visibleTestCases: data.visibleTestCases || [],
          hiddenTestCases: data.hiddenTestCases || [],
          startCode: data.startCode,
          referenceSolution: data.referenceSolution,
        });
      } catch (err) {
        console.error(err);
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
      alert("Problem Updated Successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Problem</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* BASIC INFO */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <input
            {...register("title")}
            className="input input-bordered w-full mb-3"
          />

          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full mb-3"
          />

          <div className="flex gap-4">
            <select
              {...register("difficulty")}
              className="select select-bordered w-1/2"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              {...register("tags")}
              className="select select-bordered w-1/2"
            >
              <option value="array">Array</option>
              <option value="linkedList">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">DP</option>
            </select>
          </div>
        </div>

        {/* Visible Test Cases */}
        <div className="card p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Visible Test Cases</h2>

          {visibleFields.map((field, index) => (
            <div key={field.id} className="border p-3 mb-3">
              <textarea
                {...register(`visibleTestCases.${index}.input`)}
                className="textarea w-full mb-2"
              />
              <input
                {...register(`visibleTestCases.${index}.output`)}
                className="input w-full mb-2"
              />
              <textarea
                {...register(`visibleTestCases.${index}.explanation`)}
                className="textarea w-full mb-2"
              />

              <button
                type="button"
                onClick={() => removeVisible(index)}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              appendVisible({ input: "", output: "", explanation: "" })
            }
            className="btn btn-primary btn-sm"
          >
            Add Case
          </button>
        </div>

        {/* Hidden Test Cases */}
        <div className="card p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Hidden Test Cases</h2>

          {hiddenFields.map((field, index) => (
            <div key={field.id} className="border p-3 mb-3">
              <textarea
                {...register(`hiddenTestCases.${index}.input`)}
                className="textarea w-full mb-2"
              />
              <input
                {...register(`hiddenTestCases.${index}.output`)}
                className="input w-full mb-2"
              />

              <button
                type="button"
                onClick={() => removeHidden(index)}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendHidden({ input: "", output: "" })}
            className="btn btn-primary btn-sm"
          >
            Add Case
          </button>
        </div>

        {/* Code Templates */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Code Templates</h2>

          {[0, 1, 2].map((index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">
                {index === 0 ? "C++" : index === 1 ? "Java" : "JavaScript"}
              </h3>

              {/* hidden language FIX */}
              <input
                type="hidden"
                value={
                  index === 0 ? "C++" : index === 1 ? "Java" : "JavaScript"
                }
                {...register(`startCode.${index}.language`)}
              />
              <input
                type="hidden"
                value={
                  index === 0 ? "C++" : index === 1 ? "Java" : "JavaScript"
                }
                {...register(`referenceSolution.${index}.language`)}
              />

              <textarea
                {...register(`startCode.${index}.initialCode`)}
                className="textarea w-full mb-2"
                rows={4}
              />

              <textarea
                {...register(`referenceSolution.${index}.completeCode`)}
                className="textarea w-full"
                rows={4}
              />
            </div>
          ))}
        </div>

        <button className="btn btn-success w-full">
          {updating ? "Updating..." : "Update Problem"}
        </button>
      </form>
    </div>
  );
}

export default AdminUpdate;

///////////////////////////////////////////////////////////////////////////////////

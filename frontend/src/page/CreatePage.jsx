import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon, AlertTriangle, Smile } from "lucide-react";
import toast from "react-hot-toast";

import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Enter in both the fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created Successfully");
      navigate("/"); //go to home
    } catch (error) {
      console.log("Error in Creating Notes", error);
      // ratelimiting  -->The threshold is set by the backend or API (upstash)
      if (error.response.status === 429) {
        toast.error("You are creating Notes too fast", {
          duration: 4000,
          // icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        });
      } else toast.error("Notes not created!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-base-400">
        <div className="container mx-auto px-4 py-8 ">
          <div className="mx-auto max-w-8xl ">
            <Link to={"/"} className="btn btn-ghost bg-base-100 mb-6 mx-2">
              <ArrowLeftIcon className="size-4" />
              <span>Back to Notes</span>
            </Link>
          </div>

          <div className="card bg-base-100 ">
            <div className="card-body ">
              <h2 className="card-title text-2xl mb-2">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-xl">Title</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-12">
                  <label className="label">
                    <span className="label-text text-xl">Content</span>
                  </label>

                  <textarea
                    placeholder="Write the note here"
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create One"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Link } from "react-router";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null); //will fetch from API
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // saving Note

  const navigate = useNavigate();
  const { id } = useParams(); // <Route path="/note/:id" element={<NoteDetailPage />}></Route>

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`); //we get clicked Note
        setNote(res.data);
      } catch (error) {
        if (error.res.status === 429) {
          //from upstash
          console.log("Error in getting Notes");
          toast.error("Failed to Fetch Notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Would you like to delete the note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted");
      navigate("/");
    } catch (error) {
      console.log("Error in delete");
      toast.error("Unable to Delete");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Both fields are required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error in updating Note /n", error);
      toast.error("Note not Updated");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-20" />
      </div>
    );

  return (
    <div className="min-h-screen bg-base-400">
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-2xl mx-auto ">
          <div className="flex justify-between mb-8">
            <Link to={"/"} className="btn btn-primary ">
              <ArrowLeftIcon className="size-5" />
              <span>Back to Notes</span>
            </Link>

            <button
              onClick={handleDelete}
              className=" btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              <span>Delete Note</span>
            </button>
          </div>

          <div className="card">
            <div className="card-body bg-base-100 ">
              <div className="form-control mb-4 ">
                <label className="label">
                  <span className="label-text text-xl">Title</span>
                </label>

                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => {
                    setNote({ ...note, title: e.target.value });
                  }}
                />
              </div>

              <div className="form-control mb-4 ">
                <label className="label">
                  <span className="label-text text-xl">Content</span>
                </label>

                <textarea
                  type="text"
                  placeholder="Note Content"
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => {
                    setNote({ ...note, content: e.target.value });
                  }}
                />
              </div>

              <div className="card-actions justify-end">
                <div
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
